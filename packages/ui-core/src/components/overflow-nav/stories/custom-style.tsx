import React from 'react';
import { OverflowNav } from '../';
import { Box, Grommet } from 'grommet';
import menuItems from './data/menu-items';
import styled from 'styled-components';
import { normalizeColor } from 'grommet/utils';
import { StyledOverflowNavItem } from '../styled-overflow-nav';

const StyledOverflowNav = styled(OverflowNav)`
  background-color: ${(props) => normalizeColor('brand', props.theme)};
  & ${StyledOverflowNavItem} {
    cursor: pointer;
    &:hover {
      background-color: ${(props) => normalizeColor('accent-2', props.theme)};
    }
  }
  & svg {
    stroke: #f1f1f1;
    fill: #f1f1f1;
  }

  & a,
  & span {
    color: #f1f1f1;
  }
`;

export const CustomStyle = () => {
  return (
    <Grommet>
      <Box>
        <StyledOverflowNav items={menuItems} round="small" />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Navigation/OverflowNav/Custom Style',
};
