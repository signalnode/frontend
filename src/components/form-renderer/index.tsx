import { Box, Button } from '@mui/material';
import InputRenderer from './forms/input-renderer';
import { SignalNodeConfigLayout } from '@signalnode/types';
import { saveAddonConfig } from '../../requests';

function FormRenderer({ addonName, config, configLayout }: { addonName: string; config?: { [key: string]: string }; configLayout?: SignalNodeConfigLayout<unknown> }) {
  const form = [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const config: { [key: string]: string | undefined } = {};
    for (const element of configLayout!.elements) {
      config[element.name] = formData.get(element.name)?.toString();
    }

    // TODO: Save config
    await saveAddonConfig(addonName, config);
  };

  if (!configLayout) {
    return <h1>No settings</h1>;
  } else {
    for (const element of configLayout.elements) {
      switch (element.type) {
        case 'input':
          form.push(<InputRenderer key={element.name} element={element} value={config ? config[element.name] : ''} />);
      }
    }

    return (
      <>
        <Box
          id="addon-settings"
          component="form"
          sx={{ display: 'grid', gridTemplateColumns: configLayout.columnTemplate, gridTemplateRows: configLayout.rowTemplate, gridGap: configLayout.gap }}
          onSubmit={handleSubmit}
        >
          {form}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button key="save" form="addon-settings" type="submit" variant="contained" sx={{ m: 1 }}>
            Save
          </Button>
        </Box>
      </>
    );
  }
}

export default FormRenderer;
