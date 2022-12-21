import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './views/dashboard';
import Login from './views/login';
import Store from './views/store';
import Addons from './views/addons';

import { loadSettings } from './utils/token-helper';
import AddonDetails from './views/addons/details';

function Protected({ children }: any) {
  const { refreshToken } = loadSettings();

  if (!refreshToken) return <Navigate replace to="/login" />;

  return children ? children : <Outlet />;
}

function SignalNode() {
  return (
    <div className="signal-node">
      <Navbar />

      <Routes>
        <Route index element={<Navigate replace to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/store"
          element={
            <Protected>
              <Store />
            </Protected>
          }
        />
        <Route path="/addons" element={<Protected />}>
          <Route index element={<Addons />} />
          <Route path="/addons/:name" element={<AddonDetails />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default SignalNode;
