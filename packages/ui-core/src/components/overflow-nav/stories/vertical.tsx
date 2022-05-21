import React from 'react';
import { OverflowNav } from '../';
import styled from 'styled-components';
import { Box, Grommet } from 'grommet';
import menuItems from './data/menu-items';

const StyledNav = styled(OverflowNav)`
  padding: 20px;
`;

export const Vertical = () => {
  return (
    <Grommet>
      <Box height="100vh" overflow="hidden">
        <StyledNav items={menuItems} direction="column"></StyledNav>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Navigation/OverflowNav/Vertical',
};
