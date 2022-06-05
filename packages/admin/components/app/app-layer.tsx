import { Grommet } from 'grommet';
import { useApplication } from '../../../admin/context';
import { atomicTheme } from '../../themes';
import { FormBuilderContextProvider } from 'styled-hook-form';
import { UIProvider } from '@atomic-web/ui-core';
import { ApplicationProvider } from '../../context';

const AppLayer = ({ children }) => {
  const { themeDir, themeMode } = useApplication();

  return (
    <Grommet full theme={atomicTheme} dir={themeDir} themeMode={themeMode}>
      <FormBuilderContextProvider
        options={{
          renderGrommet: false,
          theme: atomicTheme,
        }}
      >
        <UIProvider>{children}</UIProvider>
      </FormBuilderContextProvider>
    </Grommet>
  );
};

const WithApplicationProvider = ({ children }) => (
  <ApplicationProvider>
    <AppLayer>{children}</AppLayer>
  </ApplicationProvider>
);

export { WithApplicationProvider as AppLayer };
