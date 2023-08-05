import SettingsIcon from '@mui/icons-material/Settings';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { SignalNodeProperty } from '@signalnode/types';
import { useState } from 'react';
import { Property } from '../../../../types/property.type';

type Props = { properties: Property[] };

export default function PropertyTab({ properties }: Props) {
  const [selectedProperty, setSelectedProperty] = useState<Property>();

  const handleSave = () => {
    // TODO: Save settings
    setSelectedProperty(undefined);
  };
  const handleClose = () => setSelectedProperty(undefined);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="left">Unit</TableCell>
            <TableCell align="right">Settings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.name as string} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {property.name as string}
              </TableCell>
              <TableCell align="right">{property.value}</TableCell>
              <TableCell align="left">{property.unit}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="settings" onClick={() => setSelectedProperty(property)}>
                  <SettingsIcon />
                </IconButton>
                <Dialog open={selectedProperty !== undefined} onClose={handleClose}>
                  <DialogTitle>Settings</DialogTitle>
                  <DialogContent>
                    <FormControlLabel control={<Checkbox checked={property.useHistory} />} label="Use history" />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
