import { Box, RadioButtonGroup } from 'grommet';
import { Translate } from 'next-translate';
import { useMemo } from 'react';
import { useApplication } from '../../../../context';
import { OptionItem } from './options';

const DirEditor: React.FC<unknown> = () => {
  const { themeDir, toggleThemeDir } = useApplication();

  const value = useMemo(()=>themeDir === 'rtl' ? 'RTL' : 'LTR',[themeDir]);

  return (
    <Box>
        <RadioButtonGroup
          value={value}
          direction='row'
          name="theme-dir"
          onChange={toggleThemeDir}
          options={['LTR',"RTL"]}
        />
    </Box>
  );
};

export const DirOption = (t: Translate): OptionItem => ({
  title: t('options-dir'),
  editor: <DirEditor/>,
});
