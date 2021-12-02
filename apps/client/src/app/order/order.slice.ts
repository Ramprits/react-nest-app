/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const ORDER_FEATURE_KEY = 'order';

/*
 * Update these interfaces according to your requirements.
 */
export interface OrderEntity {
  id: number;
}

export interface OrderState extends EntityState<OrderEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const orderAdapter = createEntityAdapter<OrderEntity>();

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
 *   dispatch(fetchOrder())
 * }, [dispatch]);
 * ```
 */
export const fetchOrder = createAsyncThunk(
  'order/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getOrders()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialOrderState: OrderState = orderAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: '',
});

export const orderSlice = createSlice({
  name: ORDER_FEATURE_KEY,
  initialState: initialOrderState,
  reducers: {
    add: orderAdapter.addOne,
    remove: orderAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state: OrderState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchOrder.fulfilled,
        (state: OrderState, action: PayloadAction<OrderEntity[]>) => {
          orderAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchOrder.rejected, (state: OrderState, action) => {
        state.loadingStatus = 'error';
      });
  },
});

export const orderReducer = orderSlice.reducer;

export const orderActions = orderSlice.actions;

const { selectAll, selectEntities } = orderAdapter.getSelectors();

export const getOrderState = (rootState: any): OrderState =>
  rootState[ORDER_FEATURE_KEY];

export const selectAllOrder = createSelector(getOrderState, selectAll);

export const selectOrderEntities = createSelector(
  getOrderState,
  selectEntities
);
