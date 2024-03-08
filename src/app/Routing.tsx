import { Navigate, Route, Routes } from 'react-router-dom';
import { ROOT_PATH } from '@/shared/lib';
import { RootLayout } from './layout/RootLayout';
import { Home } from '@/pages/Home';

export const Routing = () => {
  return (
    <div className="container h-screen">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Navigate to={`${ROOT_PATH}products`} replace />} />
          <Route path={`${ROOT_PATH}products`} element={<Home />} />
          <Route path="/*" element={<div>Страница отсутсвует.</div>} />
        </Route>
      </Routes>
    </div>
  );
};
