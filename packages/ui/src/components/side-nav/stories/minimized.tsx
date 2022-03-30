import { Anchor, Avatar, Box, Button, Text } from 'grommet';
import { Gremlin, Logout, Menu } from 'grommet-icons';
import { useState } from 'react';
import { SideNav } from '..';
import menuItems from './data';

export default {
  title: 'Navigation/SideNav/Minimized',
};

const Minimized = () => {
  const [minimized, updateMinimized] = useState(true);

  const handleTootgle = ()=>{
    updateMinimized((m)=>!m);
  }

  return (
    <Box direction="row" fill="vertical" align="start">
      <Box fill="vertical" background="light-2" width="fit-content">
        <SideNav
          items={menuItems}
          itemHoverBackground="light-4"
          fill="vertical"
          mini={minimized}
          header={({ mini }) => (
            <Box>
              <Box direction="row" align="center">
                <Avatar background="brand" size={mini ? 'medium' : 'large'}>
                  <Gremlin />
                </Avatar>
                {!mini && (
                  <Text margin={{ start: 'small' }}> Grommet Admin </Text>
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
