import { Anchor, Avatar, Box, Text } from 'grommet';
import { Gremlin, Logout } from 'grommet-icons';
import { SideNav } from '..';
import menuItems from './data';

export default {
  title: 'Navigation/SideNav/Header And Footer',
};

const HeaderAndFooter = () => {
  return (
    <Box fill="vertical" width="medium" background="light-2">
      <SideNav
        items={menuItems}
        itemHoverBackground="light-4"
        fill="vertical"
        header={
          <Box background="light-2">
            <Box direction="row" align="center">
              <Avatar background="brand" size="large">
                <Gremlin />
              </Avatar>
              <Text margin={{start:"small"}}> Grommet Admin </Text>
            </Box>
          </Box>
        }
        footer={
          <Box direction="row" pad="small">
            <Logout /> <Anchor margin={{ start: 'small' }}>Logout</Anchor>
          </Box>
        }
      />
    </Box>
  );
};

HeaderAndFooter.args = {
  full: true,
};

export { HeaderAndFooter };
