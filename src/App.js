import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import Release1 from './pages/Release1/index';
import Release2 from './pages/Release2/index';
import StoreFront from './pages/StoreFront/index';

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