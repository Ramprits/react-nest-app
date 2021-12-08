import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../main';

export const HOME_FEATURE_KEY = 'home';

/*
 * Update these interfaces according to your requirements.
 */
export interface HomeEntity {
  id: number;
}

export interface HomeState extends EntityState<HomeEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const homeAdapter = createEntityAdapter<HomeEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchHome())
 * }, [dispatch]);
 * ```
 */
export const fetchHome = createAsyncThunk(
  'home/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getHomes()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialHomeState: HomeState = homeAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: '',
});

export const homeSlice = createSlice({
  name: HOME_FEATURE_KEY,
  initialState: initialHomeState,
  reducers: {
    add: homeAdapter.addOne,
    remove: homeAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state: HomeState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchHome.fulfilled,
        (state: HomeState, action: PayloadAction<HomeEntity[]>) => {
          homeAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchHome.rejected, (state: HomeState, action) => {
        state.loadingStatus = 'error';
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const homeReducer = homeSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(homeActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const homeActions = homeSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllHome);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = homeAdapter.getSelectors();

export const getHomeState = (rootState: RootState): HomeState =>
  rootState[HOME_FEATURE_KEY];

export const selectAllHome = createSelector(getHomeState, selectAll);

export const selectHomeEntities = createSelector(getHomeState, selectEntities);
