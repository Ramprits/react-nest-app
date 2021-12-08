import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { USER_FEATURE_KEY, userReducer } from './app/user/user.slice';

import { ORDER_FEATURE_KEY, orderReducer } from './app/order/order.slice';

import { HOME_FEATURE_KEY, homeReducer } from './app/home/home.slice';
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    [HOME_FEATURE_KEY]: homeReducer,
    [ORDER_FEATURE_KEY]: orderReducer,
    [USER_FEATURE_KEY]: userReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
