import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import AllUrls from './routes/AllUrls';
import ShortenUrl from './routes/ShortenUrl';
import AuditLogs from './routes/AuditLogs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ShortenUrl />,
      },
      {
        path: 'all-urls',
        element: <AllUrls />,
      },
      {
        path: 'audit-logs',
        element: <AuditLogs />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
