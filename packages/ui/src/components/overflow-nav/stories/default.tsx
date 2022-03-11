import React from 'react';
import { OverflowNav } from '../';
import { Box, Notification } from 'grommet';
import menuItems from "./data/menu-items"

export const Default = () => {

  return (
      <Box>
        <OverflowNav items={menuItems}></OverflowNav>
        <Notification title="Tip" message="Resize the browser window to see the overflow menu."/>
      </Box>
  );
};

const Story = {
  title: 'Navigation/OverflowNav/Default'
};

export default Story;
