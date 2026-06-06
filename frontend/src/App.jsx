import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routers from './routers/router';
import { Suspense } from 'react';
import Header from '@components/layout/Header/Header';
import Footer from '@components/layout/Footer';
import NotFound from '@pages/NotFound/NotFound';
function App() {
  const t = 1;
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />

        <Routes>
          {routers.map((router) => {
            return <Route key={router.path} path={router.path} element={router.element} />;
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
