import { Grommet, Box, grommet } from 'grommet';

const THEMES = {
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
