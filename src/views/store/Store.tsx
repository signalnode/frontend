import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';

import { useEffect, useState } from 'react';
import { Addon, fetchAddons } from '../../requests/addon';
import './Store.css';

export default function Store() {
  const [addons, setAddons] = useState<Addon[]>([]);

  useEffect(() => {
    console.log('Mounted');

    const _fetchAddons = async () => {
      const addons = await fetchAddons();
      console.log('State save');

      setAddons(addons);
    };

    _fetchAddons();

    return () => console.log('Unmounted');
  }, []);

  return (
    <Box>
      <Box sx={{ m: 1, textAlign: 'right' }}>
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
        />
      </Box>

      {addons.map((addon) => (
        <div key={addon.id}>{addon.name}</div>
      ))}
    </Box>
  );
}
