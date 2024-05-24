import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import '@/styles/global.css';
if (import.meta.env.VITE_BASE_API) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <h1
        style={{
          color: 'red',
          textTransform: 'uppercase',
        }}
      >
        !! WARNING: Setup environment first
      </h1>
    </React.StrictMode>,
  );
}
