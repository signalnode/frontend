import ClearIcon from '@mui/icons-material/Clear';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Autocomplete, IconButton, TableCell, TableRow, TextField } from '@mui/material';
import { useState } from 'react';
import { Color, ColorResult, SketchPicker } from 'react-color';

import { AreaChartConfigTableProperty } from './area-chart-config-table';
import './styles.css';
import { ColorPicker } from '../../color-picker';

type AreaChartConfigTableRow = {
  property: string;
  fillColor: string;
  strokeColor: string;
  properties: AreaChartConfigTableProperty[];
  groupBy?: (option: AreaChartConfigTableProperty) => string;
  getOptionLabel: (option: AreaChartConfigTableProperty) => string;
  onPropertySelect: (property: string) => void;
  onFillColorSelect: (color: string) => void;
  onStrokeColorSelect: (color: string) => void;
};

type ColorPicker = 'fill' | 'stroke';

export function AreaChartConfigTableRow({
  property,
  properties,
  fillColor,
  strokeColor,
  groupBy,
  getOptionLabel,
  onPropertySelect,
  onFillColorSelect,
  onStrokeColorSelect,
}: AreaChartConfigTableRow) {
  const [isFillColorPickerVisible, setFillColorPickerVisibility] = useState<boolean>(false);
  const [isStrokeColorPickerVisible, setStrokeColorPickerVisibility] = useState<boolean>(false);

  const toggleColorPickerVisibility = (picker: ColorPicker) =>
    picker === 'fill' ? setFillColorPickerVisibility((visible) => !visible) : setStrokeColorPickerVisibility((visible) => !visible);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <DragHandleIcon color="action" />
      </TableCell>
      <TableCell align="right">
        <Autocomplete
          id="tags-standard"
          size="small"
          options={properties}
          groupBy={groupBy}
          getOptionLabel={getOptionLabel}
          // inputValue={property}
          value={{ group: 'test', value: property }}
          isOptionEqualToValue={(option, property) => option.value === property.value}
          onChange={(event, option) => onPropertySelect(option?.value ?? '')}
          renderInput={(params) => <TextField {...params} variant="standard" />}
          blurOnSelect
        />
      </TableCell>
      <TableCell align="right">
        <ColorPicker
          open={isFillColorPickerVisible}
          color={fillColor}
          onToggleOpenClose={() => toggleColorPickerVisibility('fill')}
          onColorSelected={onFillColorSelect}
        />
      </TableCell>
      <TableCell align="right">
        <ColorPicker
          open={isStrokeColorPickerVisible}
          color={strokeColor}
          onToggleOpenClose={() => toggleColorPickerVisibility('stroke')}
          onColorSelected={onStrokeColorSelect}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton aria-label="delete">
          <ClearIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
