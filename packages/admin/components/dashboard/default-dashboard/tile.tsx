import React, { forwardRef } from 'react';

import { Box, BoxProps, Header, Heading } from 'grommet';
import { PadType } from 'grommet/utils';

export interface TileProps extends Omit<BoxProps, 'pad'> {
  heading?: React.ReactNode;
  pad?: PadType | boolean;
  children: React.ReactNode;
}

const Tile = forwardRef<HTMLDivElement, TileProps>((props, ref) => {
  const { children, heading, pad, ...rest } = props;

  const tilePad: PadType =
    pad === true
      ? { horizontal: 'small', top: 'small', bottom: 'small' }
      : (pad as PadType);

  return (
    <Box background={{ dark: true }}>
      <Box round="small" overflow="hidden" ref={ref} {...rest}>
        {heading && (
          <Header pad={tilePad}>
            <Heading level={2} size="xsmall" margin="none">
              {heading}
            </Heading>
          </Header>
        )}
        <Box flex pad={tilePad} fill>
          {children}
        </Box>
      </Box>
    </Box>
  );
});

Tile.displayName = 'Tile';

export { Tile };
