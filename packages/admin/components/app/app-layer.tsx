import { Grommet } from 'grommet';
import { useApplication } from '../../../admin/context';
import { atomicTheme } from '../../themes';
import { FormBuilderContextProvider } from 'styled-hook-form';
import { UIProvider } from '@atomic-web/ui-core';

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

export { AppLayer };
