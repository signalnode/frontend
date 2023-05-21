import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardActions, CardContent, Chip, InputAdornment, TextField, Typography } from '@mui/material';

import { useEffect, useRef, useState } from 'react';
import { fetchInstalledIntegrations, fetchUninstalledIntegrations, installIntegration, StoreIntegration } from '../../requests/integration.request';
// import './Store.css';

export default function Store() {
  const [filteredIntegrations, setFilteredIntegrations] = useState<(StoreIntegration & { installed: boolean })[]>([]);
  const integrations = useRef<(StoreIntegration & { installed: boolean })[]>([]);

  useEffect(() => {
    const fetchIntegrations = async () => {
      const uninstalledIntegrations = await fetchUninstalledIntegrations();
      const installedIntegrations = await fetchInstalledIntegrations();

      const mergedAddons: (StoreIntegration & { installed: boolean })[] = [];
      for (const uninstalledIntegration of uninstalledIntegrations) {
        const addon: StoreIntegration & { installed: boolean } = {
          name: uninstalledIntegration.name,
          description: uninstalledIntegration.description,
          version: uninstalledIntegration.version,
          author: uninstalledIntegration.author,
          installed: false,
        };
        for (const installedIntegration of installedIntegrations) {
          if (installedIntegration.name === uninstalledIntegration.name) {
            addon.installed = true;
            continue;
          }
        }

        mergedAddons.push(addon);
      }

      integrations.current = mergedAddons;

      setFilteredIntegrations(integrations.current);
    };

    fetchIntegrations();
  }, []);

  const filter = (filter: string) => {
    const filteredAddons = integrations.current.filter(
      (addon) => addon.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || addon.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
    setFilteredIntegrations(filteredAddons);
  };

  const handleInstall = async (addon: StoreIntegration) => {
    await installIntegration(addon);
    integrations.current.find((storeIntegration) => storeIntegration.name === addon.name)!.installed = true;
    filter('');
  };

  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', mt: 1, mb: 1, gap: 1 }}>
        <TextField
          label="Search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ gridColumnStart: 3 }}
          onChange={(e) => filter(e.target.value)}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 300px))', gap: 1 }}>
        {filteredIntegrations.map((addon) => (
          <Card key={addon.name} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="overline" component="div" sx={{ flexGrow: 1 }}>
                  {addon.name}
                </Typography>
                {/* 
                <Typography variant="body2" color="text.secondary">
                  {addon.author}
                </Typography> */}
              </Box>
              <Typography variant="subtitle2">{addon.description}</Typography>
            </CardContent>
            <CardActions>
              {!addon.installed && (
                <Button size="small" onClick={() => handleInstall(addon)}>
                  Install
                </Button>
              )}
              {addon.installed && <Chip label="Installed" />}
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}
