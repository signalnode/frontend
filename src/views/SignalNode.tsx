import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Store from './store/Store';
import Addons from './addons/Addons';

import { loadSettings } from '../token_helper';
import AddonDetails from './addons/details/AddonDetails';

function Protected({ children }: any) {
  const { refreshToken } = loadSettings();

  if (!refreshToken) return <Navigate replace to="/login" />;

  return children ? children : <Outlet />;
}

function SignalNode() {
  return (
    <div className="HomeNode">
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
