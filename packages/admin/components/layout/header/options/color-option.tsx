import { Box, RadioButtonGroup } from 'grommet';
import { FormNextLink, FormPreviousLink, Moon, Sun } from 'grommet-icons';
import { Translate } from 'next-translate';
import { ThemeMode } from '../../../../context/ui-context';
import { ChangeEvent } from 'react';
import { useApplication } from '../../../../context';
import { OptionItem } from './options';
import { RadioOption } from './radio-option';

const ColorEditor: React.FC<unknown> = () => {
  const { themeMode, setThemeMode } = useApplication();

  const optionIconMap = {
    dark: Moon,
    light: Sun,
  };

  const handleModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setThemeMode(e.target.value as ThemeMode);
  };

  return (
    <Box>
      <RadioButtonGroup
        value={themeMode}
        direction="row"
        name="theme-dir"
        onChange={handleModeChange}
        options={['light', 'dark']}
      >
        {(option, params) =>
          RadioOption(option, params, (option) => optionIconMap[option])
        }
      </RadioButtonGroup>
    </Box>
  );
};

export const ColorOption = (t: Translate): OptionItem => ({
  title: t('options-theme-mode'),
  editor: <ColorEditor />,
});
