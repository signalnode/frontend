import SettingsIcon from '@mui/icons-material/Settings';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent, DialogTitle,
  FormControlLabel, IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { SignalNodeEntity } from '@signalnode/types';
import { useState } from 'react';
type Props = { entities: SignalNodeEntity<unknown, unknown>[] };

export default function EntityTab({ entities }: Props) {
  const [selectedEntity, setSelectedEntity] = useState<SignalNodeEntity<unknown, unknown>>();

  const handleSave = () => {
    // TODO: Save settings
    setSelectedEntity(undefined);
  };
  const handleClose = () => setSelectedEntity(undefined);

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
          {entities.map((entity) => (
            <TableRow key={entity.name as string} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {entity.name as string}
              </TableCell>
              <TableCell align="right">{entity.value}</TableCell>
              <TableCell align="left">{entity.unit}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="settings" onClick={() => setSelectedEntity(entity)}>
                  <SettingsIcon />
                </IconButton>
                <Dialog open={selectedEntity !== undefined} onClose={handleClose}>
                  <DialogTitle>Settings</DialogTitle>
                  <DialogContent>
                    <FormControlLabel control={<Checkbox />} label="Use history" />
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
