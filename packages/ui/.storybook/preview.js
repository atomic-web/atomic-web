import { Grommet, grommet } from 'grommet';

const THEMES = {
  grommet,
  base: {},
};

export const decorators = [
  (Story, state) => {
    const { theme, dir } = state.globals;
    const { full } = state.args;

    return (
      <Grommet
        theme={THEMES[theme]}
        dir={dir === '' ? undefined : dir}
        full={full}
      >
        <Story />
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

export const parameters = {
  layout: 'fullscreen',
};
