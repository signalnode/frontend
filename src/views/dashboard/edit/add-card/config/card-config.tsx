import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { AreaChartConfigTable } from '../../../../../components/cards/area-chart-config-table';
import AreaChartCard, { AreaChartAxis, AreaChartData } from '../../../../../components/charts/area-chart';
import { fetchDevices, fetchProperties } from '../../../../../requests';
import { fetchHistory } from '../../../../../requests/history.request';
import { Device } from '../../../../../types/device.type';
import { History } from '../../../../../types/history.type';
import { Property } from '../../../../../types/property.type';

type CardConfigDialog = { open: boolean; onSave: (config: any) => void; onClose: () => void };
export default function CardConfigDialog({ open, onSave, onClose }: CardConfigDialog) {
  const [properties, setProperties] = useState<Property[]>();
  const [xAxis, setXAxis] = useState<string>();
  const [yAxes, setYAxes] = useState<AreaChartAxis[]>([]);
  // const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    const _fetchProperties = async () => {
      const properties = await fetchProperties();
      console.log(properties);
      setProperties(properties);
    };

    _fetchProperties();
  }, []);

  const _onSave = () => {
    onSave({ xAxis, yAxes });
    onClose();
  };

  // const _fetchHistory = async (propertyNames?: string[]) => {
  //   const history = await fetchHistory({
  //     properties: devices
  //       ?.flatMap((device) => device.properties)
  //       .filter((property) => propertyNames?.includes(property.name))
  //       .map((property) => property.name),
  //   });

  //   setHistory(history);
  // };

  const onPropertyAdded = (yAxis: AreaChartAxis, index: number) => {
    setYAxes((yAxes) => {
      if (index < 0) return [...yAxes, yAxis];
      yAxes[index] = yAxis;
      return yAxes.slice();
    });
  };

  const generateChartData: () => AreaChartData[] | undefined = () => {
    if (!xAxis || yAxes.length === 0) return undefined;

    // TODO: Refacor!!!
    const data: AreaChartData[] = [];
    const selectedProperties = properties?.filter((property) => yAxes.map((yAxis) => yAxis.name).includes(property.name));
    const length = selectedProperties?.reduce((sum, val) => sum + (val.history?.length ?? 0), 0) ?? 0;

    for (let i = 0; i < length / (selectedProperties?.length ?? 0); i++) {
      const obj: AreaChartData = selectedProperties!.reduce((obj, property) => {
        // TODO: Key of history is bad, maybe there will be keys of other objects
        return { ...obj, [xAxis]: property.history![i][xAxis as keyof History], [property.name]: property.history![i].value };
      }, {});

      if (obj) data.push(obj);
    }

    return data;
  };

  if (!properties) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  const xAxisOptions = [
    { goup: 'General', label: 'createdAt' },
    ...properties?.map((property) => ({ group: property.devices![0].name, label: property.name })),
  ].map((option) => (
    <MenuItem key={`xAxis-${option.label}`} value={option.label}>
      {option.label}
    </MenuItem>
  ));

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'md'}
      PaperProps={{ sx: { position: 'unset' } }}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Card Config</DialogTitle>
      <DialogContent>
        <AreaChartCard xAxis={xAxis} yAxes={yAxes} data={generateChartData()} />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">xAxis</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={xAxis ?? ''}
            label="xAxis"
            onChange={(event) => setXAxis(event.target.value)}
          >
            {xAxisOptions}
          </Select>
        </FormControl>
        <AreaChartConfigTable
          properties={properties.map((property) => ({ value: property.name, group: 'test' }))}
          rows={yAxes}
          onRowChange={(row, index) => onPropertyAdded(row, index)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={_onSave}>Close</Button>
        <Button onClick={onClose} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
