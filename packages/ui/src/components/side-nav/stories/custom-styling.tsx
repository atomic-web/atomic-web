import { Box } from 'grommet';
import styled from 'styled-components';
import { SideNav } from '..';
import menuItems from './data';
import { StyledSideNavItem } from '..';

export default {
  title: 'Navigation/SideNav/Custom Styling',
};

const CustomSideNav = styled(SideNav).attrs({
  background: 'light-2',
})`
  & ${StyledSideNavItem} {
    transition: all 0.2s ease-in-out;
  }
`;

const CustomStyling = () => {
  return (
    <Box fill="vertical" width="medium">
      <CustomSideNav
        items={menuItems}
        itemBackground={({ active }) => (active ? 'brand' : 'light-2')}
        itemHoverBackground="light-4"
        activeItem='inbox'
        fill="vertical"
      />
    </Box>
  );
};

CustomStyling.args = {
  full: true,
};

export { CustomStyling };
