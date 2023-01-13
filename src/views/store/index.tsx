import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardActions, CardContent, Chip, InputAdornment, TextField, Typography } from '@mui/material';

import { useEffect, useRef, useState } from 'react';
import { fetchAvailableAddons, fetchInstalledAddons, installAddon, StoreAddon } from '../../requests/addon';
// import './Store.css';

export default function Store() {
  const [filteredAddons, setFilteredAddons] = useState<(StoreAddon & { installed: boolean })[]>([]);
  const addons = useRef<(StoreAddon & { installed: boolean })[]>([]);

  useEffect(() => {
    const _fetchAddons = async () => {
      const availableAddons = await fetchAvailableAddons();
      const installedAddons = await fetchInstalledAddons();

      const mergedAddons: (StoreAddon & { installed: boolean })[] = [];
      for (const availableAddon of availableAddons) {
        const addon: StoreAddon & { installed: boolean } = {
          name: availableAddon.name,
          description: availableAddon.description,
          version: availableAddon.version,
          wiki: availableAddon.wiki,
          author: availableAddon.author,
          installed: false,
        };
        for (const installedAddon of installedAddons) {
          if (installedAddon.name === availableAddon.name) {
            addon.installed = true;
            continue;
          }
        }

        mergedAddons.push(addon);
      }

      addons.current = mergedAddons;

      setFilteredAddons(addons.current);
    };

    _fetchAddons();
  }, []);

  const filter = (filter: string) => {
    const filteredAddons = addons.current.filter(
      (addon) => addon.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || addon.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
    setFilteredAddons(filteredAddons);
  };

  const handleInstall = async (addon: StoreAddon) => {
    await installAddon(addon);

    addons.current.find((storeAddon) => storeAddon.name === addon.name)!.installed = true;
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
        {filteredAddons.map((addon) => (
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
