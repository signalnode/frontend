import { TextField } from '@mui/material';
import { InputElement } from '@signalnode/types';

function InputRenderer({ value, element }: { value: string; element: InputElement<unknown> }) {
  return (
    <TextField
      id={element.name}
      name={element.name}
      label={element.label}
      defaultValue={value}
      variant="outlined"
      size="small"
      sx={element.options && { gridColumnStart: element.options.columnStart, gridRowStart: element.options.rowStart }}
    />
  );
}

export default InputRenderer;
