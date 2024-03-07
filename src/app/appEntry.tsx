import React from 'react';
import ReactDOM from 'react-dom/client';
import { BaseLayout } from './layout/BaseLayout';
import '@/shared/global.css';
import { QueryProvider } from './providers/QueryProvider';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './providers/ProductProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <ProductProvider>
          <BaseLayout />
        </ProductProvider>
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
);
