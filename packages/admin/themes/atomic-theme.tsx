import { ThemeType, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { colors } from './colors';

export interface AtomicThemeType extends ThemeType {
  dir?: 'rtl' | undefined;
}

const atomicTheme: AtomicThemeType = deepMerge(grommet, {
  defaultMode: 'light',
  global :{
      colors 
  }
});

export { atomicTheme };
