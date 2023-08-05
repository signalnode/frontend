import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './views/dashboard/dashboard';
import Login from './views/login';
import Store from './views/store/store';
import Devices from './views/devices/devices';
import AddDevice from './views/devices/add';

import { loadSettings } from './utils/token-helper';
import DeviceDetails from './views/devices/details';
import { useDashboardMode } from './hooks/dashboard.hook';
import DashboardEdit from './views/dashboard/edit/edit';
import Cards from './views/dashboard/edit/add-card/cards';

import './signalnode.css';

function Protected({ children }: any) {
  const { refreshToken } = loadSettings();

  if (!refreshToken) return <Navigate replace to="/login" />;

  return children ? children : <Outlet />;
}

function SignalNode() {
  const [isEditable, toggleEditMode] = useDashboardMode();

  return (
    <div className="signalnode">
      <Navbar toggleDashboardMode={toggleEditMode} />

      <div className="content">
        <Routes>
          <Route index element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<Protected />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/edit" element={<DashboardEdit />} />
            <Route path="/dashboard/edit/add-card" element={<Cards />} />
          </Route>
          <Route
            path="/store"
            element={
              <Protected>
                <Store />
              </Protected>
            }
          />
          <Route path="/devices" element={<Protected />}>
            <Route index element={<Devices />} />
            <Route path="/devices/add" element={<AddDevice />} />
            <Route path="/devices/:name" element={<DeviceDetails />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default SignalNode;
