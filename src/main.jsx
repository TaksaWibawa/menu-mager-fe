/* eslint-disable comma-dangle */
import ReactDOM from 'react-dom/client';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './routes';
import store from './store.jsx';
import './index.css';
import { LayoutBase } from './layouts';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <LayoutBase>
        <RouterProvider router={router} />
      </LayoutBase>
    </Provider>
  </React.StrictMode>
);
