import { Box, RadioButtonGroup } from 'grommet';
import { FormNextLink, FormPreviousLink } from 'grommet-icons';
import { Translate } from 'next-translate';
import { useMemo } from 'react';
import { useApplication } from '../../../../context';
import { OptionItem } from './options';
import { RadioOption } from './radio-option';

const DirEditor: React.FC<unknown> = () => {
  const { themeDir, toggleThemeDir } = useApplication();

  const value = useMemo(() => (themeDir === 'rtl' ? 'RTL' : 'LTR'), [themeDir]);
  const optionIconMap = {
      'RTL' : FormPreviousLink,
      'LTR' : FormNextLink
  }  

  return (
    <Box>
      <RadioButtonGroup
        value={value}
        direction="row"
        name="theme-dir"
        onChange={toggleThemeDir}
        options={['LTR', 'RTL']}
      >
          {(option , params)=>RadioOption(option,params , (option)=>optionIconMap[option])}
      </RadioButtonGroup>
    </Box>
  );
};

export const DirOption = (t: Translate): OptionItem => ({
  title: t('options-dir'),
  editor: <DirEditor />,
});
