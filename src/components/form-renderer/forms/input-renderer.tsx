import { TextField } from '@mui/material';
import { InputElement } from '@signalnode/types';

export function InputRenderer({ value, element }: { value: string; element: InputElement<unknown> }) {
  return (
    <TextField
      id={element.name}
      name={element.name}
      label={element.label}
      type={element.type}
      defaultValue={value}
      variant="outlined"
      size="small"
      sx={element.options && { gridColumnStart: element.options.columnStart, gridRowStart: element.options.rowStart }}
      autoComplete={element.type === 'password' ? 'off' : element.name}
    />
  );
}
