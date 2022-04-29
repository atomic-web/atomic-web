import { PropType } from '../utils/types/prop-type';
import { AtomicThemeType } from './atomic-theme';

export const colors: PropType<
  PropType<AtomicThemeType, 'global'>,
  'colors'
> = {
    "background-back" : {
      light:"#f5f5f5",
      dark :"#252525"
    }
};
