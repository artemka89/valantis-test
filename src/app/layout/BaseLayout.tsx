import { Home } from '@/pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RootLayout } from './RootLayout';

export const BaseLayout = () => {
  return (
    <div className="container h-screen">
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="/valantis-test" />} />
          <Route path='/valantis-test' element={<Home />} />
          <Route path="/*" element={<div>Страница отсутсвует.</div>} />
        </Route>
      </Routes>
    </div>
  );
};
