import { Grommet, Box, grommet } from 'grommet';
import {hpe} from "grommet-theme-hpe/dist/es6/themes/hpe";

const THEMES = {
  hpe,
  grommet,
  base: {},
};

export const decorators = [
  (Story, state) => {
    const { theme , dir } = state.globals;

    return (
      <Grommet theme={theme} dir={dir}>
        <Box>
          <Story />
        </Box>
      </Grommet>
    );
  },
];

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'grommet',
    toolbar: {
      items: Object.keys(THEMES),
      showName: true,
    },
  },
  dir: {
    name: 'Direction',
    defaultValue: '',
    toolbar: {
      items: [
        {
          title: 'LTR',
          value: '',
        },
        { title: 'RTL', value: 'rtl' },
      ],
      showName: true,
    },
  },
};
