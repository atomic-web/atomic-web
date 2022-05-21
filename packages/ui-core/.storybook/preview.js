import { Grommet, grommet } from 'grommet';
import { UIProvider } from '../src/components/provider';

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
        <UIProvider>
          <Story />
        </UIProvider>
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
