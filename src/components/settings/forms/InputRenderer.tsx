import { TextField } from '@mui/material';

export type Input = {
  type: 'input';
  label: string;
  name: string;
  value?: string | boolean;
};

function InputRenderer(props: { settings: Input }) {
  return <TextField id={props.settings.name} name={props.settings.name} label={props.settings.label} variant="outlined" />;
}

export default InputRenderer;
