import { DeleteOutline as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import { Alert, Box, Card, CardActions, CardContent, CircularProgress, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import { LocalAddon, deinstallAddon, fetchInstalledAddons } from '../../requests/addon';

export default function Store() {
  const [filteredAddons, setFilteredAddons] = useState<LocalAddon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const installedAddons = useRef<LocalAddon[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const _fetchAddons = async () => {
      const addons = await fetchInstalledAddons();
      installedAddons.current = addons;
      setIsLoading(false);
      setFilteredAddons(addons);
    };

    _fetchAddons();
  }, []);

  const filter = (filter: string) => {
    const filteredAddons = installedAddons.current.filter(
      (addon) => addon.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || addon.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
    setFilteredAddons(filteredAddons);
  };

  const handleDeinstall = async (id: number) => {
    await deinstallAddon(id);

    installedAddons.current = installedAddons.current.filter((addon) => addon.id !== id);
    filter('');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (filteredAddons.length > 0) {
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

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))', gap: 1 }}>
          {filteredAddons.map((addon) => (
            <Card key={addon.id} variant="outlined" onClick={() => navigate(`/addons/${encodeURI(addon.name)}`)} sx={{ cursor: 'pointer' }}>
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
                <Typography variant="body2">{addon.description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton size="large" aria-label="deinstall" color="error" onClick={() => handleDeinstall(addon.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      </>
    );
  } else {
    return (
      <Alert severity="info" sx={{ m: 1 }}>
        You have no addons installed. Go to{' '}
        <Link component={RouterLink} to="/store">
          Store
        </Link>{' '}
        to install addons
      </Alert>
    );
  }
}
