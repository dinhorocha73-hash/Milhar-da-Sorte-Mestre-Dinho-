import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import History from './pages/History';
import Favorites from './pages/Favorites';
import Batch from './pages/Batch';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import { AppRoute } from './types';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={AppRoute.HOME} element={<Home />} />
          <Route path={AppRoute.HISTORY} element={<History />} />
          <Route path={AppRoute.FAVORITES} element={<Favorites />} />
          <Route path={AppRoute.BATCH} element={<Batch />} />
          <Route path={AppRoute.STATS} element={<Stats />} />
          <Route path={AppRoute.SETTINGS} element={<Settings />} />
          <Route path="*" element={<Navigate to={AppRoute.HOME} replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;