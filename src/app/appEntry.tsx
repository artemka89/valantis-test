import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { ProductProvider } from './providers/ProductProvider';
import { Routing } from './Routing';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <ProductProvider>
          <Routing />
        </ProductProvider>
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
);
