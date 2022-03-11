import React from 'react';
import { OverflowNav } from '../';
import { Box, Grommet, Notification } from 'grommet';
import menuItems from "./data/menu-items"

export const Default = () => {

  return (
    <Grommet>
      <Box>
        <OverflowNav items={menuItems}></OverflowNav>
        <Notification title="Tip" message="Resize the browser window to see the overflow menu."/>
      </Box>
    </Grommet>
  );
};

const Story = {
  title: 'Navigation/OverflowNav/Default'
};

export default Story;
