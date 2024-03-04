import React from 'react';
import ReactDOM from 'react-dom/client';
import { BaseLayout } from './layout/BaseLayout';
import '@/shared/global.css';
import { QueryProvider } from './providers/QueryProvider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>   
          <BaseLayout />     
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
);
