import { Autocomplete, Box, Button, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { createDevice, fetchInstalledIntegrations, fetchProperties } from '../../requests';
import { Integration } from '../../types/integration.type';
import { Property } from '../../types/property.type';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useNavigate } from 'react-router-dom';

export default function AddDevice() {
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration>();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const _fetchIntegrations = async () => {
      const integrations = await fetchInstalledIntegrations();
      setIntegrations(integrations);
    };

    const _fetchProperties = async () => {
      const properties = await fetchProperties();
      setProperties(properties);
    };

    _fetchIntegrations();
    _fetchProperties();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('device-name')!.toString();
    const description = data.get('device-description')!.toString();
    await createDevice(name, description, selectedIntegration!);
    navigate(`/devices/${name}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={integrations}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Integrations" />}
        onChange={(event, integration) => setSelectedIntegration(integration ?? undefined)}
      />
      <TextField id="device-name" name="device-name" label="Name" variant="outlined" />
      <TextField id="device-description" name="device-description" label="Description" variant="outlined" />
      {selectedIntegration?.useForeignProperties && (
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={properties}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />} style={{ marginRight: 8 }} checked={selected} />
              {option.name}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Checkboxes" placeholder="Favorites" />}
        />
      )}
      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  );
}
