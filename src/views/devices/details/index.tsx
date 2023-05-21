// import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Device } from '../../../types/device.type';
import { useParams } from 'react-router-dom';
import { fetchDevice } from '../../../requests';
import { Box, Tabs, Tab, CircularProgress } from '@mui/material';
import FormRenderer from '../../../components/form-renderer';
import OverviewTab from './tabs/overview';
import PropertyTab from './tabs/properties';
// import { fetchInstalledAddonDetails } from '../../../requests/device.request';
// import { CircularProgress } from '@mui/material';
// import FormRenderer from '../../../components/form-renderer';
// import OverviewTab from './tabs/overview';
// import PropertyTab from './tabs/properties';
// import { Addon } from '../../../types/integration.type';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
  const [activeTab, setActiveTab] = useState(0);
  const [device, setDevice] = useState<Device>();

  const handleTabChange = (event: React.SyntheticEvent, tabId: number) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const _fetchDevice = async () => {
      const device = await fetchDevice(name!);
      setDevice(device);
    };

    _fetchDevice();
  }, [name]);

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
          <Tab label="Overview" />
          <Tab label="Settings" />
          <Tab label="Properties" />
          <Tab label="Logs" />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <OverviewTab name={device!.name} started={device!.activated} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <FormRenderer addonName={device!.name} config={device!.config} configLayout={device!.integration.configSchema} />
      </TabPanel>
      {/* <TabPanel value={activeTab} index={2}>
        <PropertyTab properties={device!.properties} />
      </TabPanel> */}
      <TabPanel value={activeTab} index={3}>
        Item Three
      </TabPanel>
    </Box>
  );
}
