import { Home } from '@/pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { ROOT_PATH } from '@/shared/lib/config';

export const BaseLayout = () => {
  return (
    <div className="container h-screen">
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to={`${ROOT_PATH}`} />} />
          <Route path={`${ROOT_PATH}`} element={<Home />} />
          <Route path="/*" element={<div>Страница отсутсвует.</div>} />
        </Route>
      </Routes>
    </div>
  );
};
