import React from 'react';
import { OverflowNav } from '../';
import { Box } from 'grommet';
import menuItems from "./data/menu-items"

export const Default = () => {

  return (
      <Box width="500px" background="light-2">
        <OverflowNav items={menuItems}></OverflowNav>
      </Box>
  );
};

const Story = {
  title: 'Navigation/OverflowNav/Default'
};

export default Story;
