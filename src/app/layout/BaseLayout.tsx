import { Home } from '@/pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { ROOT_PATH } from '@/shared/lib/config';

export const BaseLayout = () => {

  console.log(`${ROOT_PATH}products`)
  return (
    <div className="container h-screen">
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<Navigate to={`${ROOT_PATH}products`} />} />
          <Route path={`${ROOT_PATH}products`}element={<Home />} />
          <Route path="/*" element={<div>Страница отсутсвует.</div>} />
        </Route>
      </Routes>
    </div>
  );
};
