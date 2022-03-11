import React from 'react';
import { OverflowNav } from '../';
import { Box, Grommet , Notification } from 'grommet';
import menuItems from './data/menu-items';

export const CustomTag = () => {
 
  return (
    <Grommet>
      <Box>
        <OverflowNav
          items={menuItems}
          tag="div"
          itemTag="span"
        ></OverflowNav>
        <Notification title="Tip" message="Open dev tools to see generated markup!"/>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Navigation/OverflowNav/Custom Tag',
};
