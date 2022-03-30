import { Anchor, Avatar, Box, Button, Text } from 'grommet';
import { Gremlin, Logout, Menu } from 'grommet-icons';
import { useState } from 'react';
import styled from 'styled-components';
import { SideNav, StyledSideNavItem } from '..';
import menuItems from './data';

export default {
  title: 'Navigation/SideNav/Minimized',
};

const Title = styled(Text)`
   white-space:nowrap;
   overflow:hidden;
`

const StyledSideNav = styled(SideNav)`
   & ${StyledSideNavItem}.mini svg{
       padding:10px;
       background-color:#ddd;
       border-radius:5px;
   }
   & ${StyledSideNavItem}.mini:hover svg{
       background-color:#f1f1f1;
   }
`;

const Minimized = () => {
  const [minimized, updateMinimized] = useState(true);

  const handleTootgle = ()=>{
    updateMinimized((m)=>!m);
  }

  return (
    <Box direction="row" fill="vertical" align="start">
      <Box fill="vertical" background="light-2" width="fit-content">
        <StyledSideNav
          items={menuItems}
          itemHoverBackground="light-4"
          fill="vertical"
          mini={minimized}
          miniWidth="80px"
          width="300px"
          header={({ mini }) => (
            <Box>
              <Box direction="row" align="center">
                <Avatar background="brand" size={mini ? '2em' : 'medium'}>
                  <Gremlin />
                </Avatar>
                {!mini && (
                  <Title margin={{ start: 'small' }}> Grommet Admin </Title>
                )}
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
      <Button icon={<Menu/>} margin="small" onClick={handleTootgle}/>
    </Box>
  );
};

Minimized.args = {
  full: true,
};

export { Minimized };
