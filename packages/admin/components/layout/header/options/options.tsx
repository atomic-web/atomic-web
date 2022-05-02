import { Box, Button, Layer, List, ThemeContext } from 'grommet';
import { Apps, FormNextLink, FormPreviousLink } from 'grommet-icons';
import { AtomicThemeType } from '../../../../themes/atomic-theme';
import React, { useContext, useState } from 'react';
import { DirOption } from './dir-option';
import useTranslation from 'next-translate/useTranslation';
import { ColorOption } from './color-option';

export interface OptionItem {
  title: React.ReactNode | string;
  editor: React.ReactNode;
}

const Options: React.FC<unknown> = () => {
  const { dir }: AtomicThemeType = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('theme');

  const closeOptions = () => setIsOpen(false);

  return (
    <Box>
      <Button icon={<Apps />} onClick={() => setIsOpen((o) => !o)} />
      {isOpen && (
        <Layer
          position={!dir ? 'right' : 'left'}
          full="vertical"
          onEsc={closeOptions}
          onClickOutside={closeOptions}
        >
          <Box direction="row">
            <Button
              onClick={closeOptions}
              icon={
                !dir ? (
                  <FormNextLink size="medium" />
                ) : (
                  <FormPreviousLink size="medium" />
                )
              }
            />
          </Box>
          <List
            primaryKey="title"
            secondaryKey="editor"
            data={[DirOption(t), ColorOption(t)]}
          />
        </Layer>
      )}
    </Box>
  );
};

export { Options };
