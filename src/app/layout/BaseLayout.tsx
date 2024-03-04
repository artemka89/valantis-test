import { Home } from '@/pages/Home';
import { Route, Routes } from 'react-router-dom';
import { RootLayout } from './RootLayout';

export const BaseLayout = () => {
  return (
    <div className="container h-screen">
      <Routes>
        <Route element={<RootLayout />}>
          {/* <Route path="/" element={<Navigate to="/products" />} /> */}
          <Route index element={<Home />} />
          <Route path="/*" element={<div>Страница отсутсвует.</div>} />
        </Route>
      </Routes>
    </div>
  );
};
