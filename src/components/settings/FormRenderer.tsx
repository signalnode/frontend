import { Box } from '@mui/material';
import InputRenderer, { Input } from './forms/InputRenderer';

type Setting = Input;

function FormRenderer(props: { settings: Setting[] | undefined }) {
  const form = [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const config: { [key: string]: string | undefined } = {};
    for (const setting of props.settings!) {
      config[setting.name] = formData.get(setting.name)?.toString();
    }

    console.log(config);

    // TODO: Save config
  };

  if (!props.settings) {
    return <h1>No settings</h1>;
  } else {
    for (const setting of props.settings) {
      switch (setting.type) {
        case 'input':
          form.push(<InputRenderer key={setting.name} settings={setting} />);
      }
    }

    return (
      <Box component="form" sx={{ display: 'grid' }} onSubmit={handleSubmit}>
        {form}
      </Box>
    );
  }
}

export default FormRenderer;
