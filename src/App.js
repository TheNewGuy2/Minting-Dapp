import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home/index'));
const Release1 = lazy(() => import('./pages/Release1/index'));
const Release2 = lazy(() => import('./pages/Release2/index'));
const Release3 = lazy(() => import('./pages/Release3/index'));
const StoreFront = lazy(() => import('./pages/StoreFront/index'));

function App() {
  
  const Loader = () => {
    return <>loading...</>;
  };

  return (
    <Router history={history}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path='/'
            element={
              <Home />
            }
          />
          <Route
            path='/release1'
            element={
              <Release1 />
            }
          />
          <Route
            path='/release2'
            element={
              <Release2 />
            }
          />
          <Route
            path='/release3'
            element={
              <Release3 />
            }
          />
          <Route
            path='/storefront'
            element={
              <StoreFront />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;