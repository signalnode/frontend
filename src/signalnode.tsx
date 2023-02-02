import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './views/dashboard/dashboard';
import Login from './views/login';
import Store from './views/store';
import Addons from './views/addons';

import { loadSettings } from './utils/token-helper';
import AddonDetails from './views/addons/details';
import { useDashboardMode } from './hooks/dashboard.hook';
import DashboardEdit from './views/dashboard/edit/edit';
import AddCard from './views/dashboard/edit/add-card/add-card';

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

      <Routes>
        <Route index element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Protected />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/edit" element={<DashboardEdit />} />
          <Route path="/dashboard/edit/add-card" element={<AddCard />} />
        </Route>
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
