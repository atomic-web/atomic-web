import { Anchor, Avatar, Box, Text } from 'grommet';
import { SideNav, StyledSideNavItem } from '@atomic-web/UI';
import styled from 'styled-components';
import { menuItems } from './side-nav-items';
import { Gremlin, Logout } from 'grommet-icons';
import { Branding } from './branding';

const Title = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
`;

const StyledSideNav = styled(SideNav)`
  & ${StyledSideNavItem}.mini svg {
    padding: 10px;
    background-color: #ddd;
    border-radius: 5px;
  }
  & ${StyledSideNavItem}.mini:hover svg {
    background-color: #f1f1f1;
  }
`;

const SideBar: React.FC = () => {
  return (
    <Box fill="vertical" background="brand">
      <StyledSideNav
        items={menuItems}
        itemHoverBackground="light-4"
        fill="vertical"
        miniWidth="80px"
        width="300px"
        header={({ mini }) => (
          <Box>
            <Box direction="row" align="center">
              {mini && (
                <Avatar background="brand" size={mini ? '2em' : 'medium'}>
                  <Gremlin />
                </Avatar>
              )}
              {!mini && <Branding />}
            </Box>
          </Box>
        )}
        footer={({ mini }) => (
          <Box direction="row" pad="small">
            <Logout />{' '}
            {!mini && <Anchor margin={{ start: 'small' }}>Logout</Anchor>}
          </Box>
        )}
      />
    </Box>
  );
};

export { SideBar };
