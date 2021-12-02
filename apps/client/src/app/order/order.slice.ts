import { RootState } from './../../main';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const ORDER_FEATURE_KEY = 'order';

export interface OrderEntity {
  id: number;
}

export interface OrderState extends EntityState<OrderEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const orderAdapter = createEntityAdapter<OrderEntity>();

export const fetchOrder = createAsyncThunk(
  'order/fetchStatus',
  async (_, thunkAPI) => {
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

export const getOrderState = (rootState: RootState): OrderState =>
  rootState[ORDER_FEATURE_KEY];

export const selectAllOrder = createSelector(getOrderState, selectAll);

export const selectOrderEntities = createSelector(
  getOrderState,
  selectEntities
);
