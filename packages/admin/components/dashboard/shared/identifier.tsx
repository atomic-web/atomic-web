import React from 'react';

import { Box, Text } from 'grommet';

const Identifier = ({ children, title, subTitle, size, ...rest }) => (
  <Box align="center" {...rest}>
    {children}
    <Box>
      <Text size={size} weight="bold" color="text-strong">
        {title}
      </Text>
      <Text color="text" size={size}>{subTitle}</Text>
    </Box>
  </Box>
);

export { Identifier };
