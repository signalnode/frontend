import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInstalledAddonDetails } from '../../../requests/addon.request';
import { CircularProgress } from '@mui/material';
import FormRenderer from '../../../components/form-renderer';
import OverviewTab from './tabs/overview';
import PropertyTab from './tabs/properties';
import { Addon } from '../../../types/addon.type';

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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AddonDetails() {
  const { name } = useParams();
  const [value, setValue] = useState(0);
  const [addon, setAddon] = useState<Addon>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchAddonDetails = async () => {
      const addon = await fetchInstalledAddonDetails(name!);
      console.log(addon);

      setAddon(addon);
    };

    fetchAddonDetails();
  }, [name]);

  if (!addon) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Overview" />
          <Tab label="Settings" />
          <Tab label="Properties" />
          <Tab label="Logs" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OverviewTab name={addon.name} started={addon.activated} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormRenderer addonName={addon.name} config={addon.config} configLayout={addon.configLayout} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PropertyTab properties={addon.properties} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </Box>
  );
}
