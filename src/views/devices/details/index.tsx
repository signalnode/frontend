// import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Box, CircularProgress, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, Route, useLocation, useParams } from 'react-router-dom';
import { fetchDevice } from '../../../requests';
import { Device } from '../../../types/device.type';
import OverviewTab from './tabs/overview';
import PropertyTab from './tabs/properties';
import SettingsTab from './tabs/settings';
// import { fetchInstalledAddonDetails } from '../../../requests/device.request';
// import { CircularProgress } from '@mui/material';
// import FormRenderer from '../../../components/form-renderer';
// import OverviewTab from './tabs/overview';
// import PropertyTab from './tabs/properties';
// import { Addon } from '../../../types/integration.type';

interface TabPanelProps {
  children?: React.ReactNode;
  tab: string;
  value: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, tab, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== tab} id={`simple-tabpanel-${tab}`} aria-labelledby={`simple-tab-${tab}`} {...other}>
      {value === tab && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

export default function DeviceDetails() {
  const { name } = useParams();
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState<string>(hash ? hash.replace('#', '').toLowerCase() : 'overview');
  const [device, setDevice] = useState<Device>();

  const handleTabChange = (event: SyntheticEvent, activeTab: string) => {
    setActiveTab(activeTab);
  };

  const _fetchDevice = async () => {
    const device = await fetchDevice(name!);
    setDevice(device);
  };

  const handleSaveSettings = async () => {
    _fetchDevice();
  };

  useEffect(() => {
    _fetchDevice();
  }, []);

  if (!device) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example" centered>
          <Tab component={Link} to="#Overview" label="Overview" value="overview" />
          <Tab component={Link} to="#Settings" label="Settings" value="settings" />
          <Tab component={Link} to="#Properties" label="Properties" value="properties" />
          <Tab component={Link} to="#Logs" label="Logs" value="logs" />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} tab="overview">
        <OverviewTab name={device.name} started={device.activated} onToggleStartStop={_fetchDevice} />
      </TabPanel>
      {device.configSchema && (
        <TabPanel value={activeTab} tab="settings">
          <SettingsTab device={device} onSave={handleSaveSettings} />
        </TabPanel>
      )}
      <TabPanel value={activeTab} tab="properties">
        <PropertyTab properties={device.properties} />
      </TabPanel>
      <TabPanel value={activeTab} tab="logs">
        Item Three
      </TabPanel>
    </Box>
  );
}
