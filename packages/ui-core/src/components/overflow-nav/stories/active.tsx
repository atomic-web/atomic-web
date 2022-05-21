import React, { useState } from 'react';
import { OverflowNav } from '../';
import { Box, NameValueList, NameValuePair, RadioButtonGroup } from 'grommet';
import menuItems from './data/active-items';
import styled from 'styled-components';
import { StyledOverflowNavItem } from '../styled-overflow-nav';
import { PropType } from '../../../';
import { OverflowNavProps } from '../types';

const StyledOverflowNav = styled(OverflowNav)`
  background: #fafafa;
  padding: 1em 0 0;
  & ${StyledOverflowNavItem}.active {
    border-bottom: solid 3px #f78166;
  }
`;

const activeIndicatorValues: Record<
  string,
  PropType<OverflowNavProps, 'activeIndicator'>
> = {
  both: true,
  none: false,
  overflow: (overflow: boolean) => overflow,
  normal: (overflow: boolean) => !overflow,
};

export const Active = () => {
  const [activeOption, setActiveOption] = useState('overflow');
  const activeIndicator = activeIndicatorValues[activeOption];

  return (
    <Box>
      <Box background="#f6f8fa" height="small" justify="end" pad="0">
        <Box width="large">
          <StyledOverflowNav
            activeIndicator={activeIndicator}
            items={menuItems}
          />
        </Box>
      </Box>
      <Box align="center" pad="large">
        <NameValueList pairProps={{ direction: 'column' }}>
          <NameValuePair name="Active Type">
            <RadioButtonGroup
              value={activeOption}
              onChange={(e) => setActiveOption(e.target.value)}
              name="active-options"
              pad="small"
              round="xsmall"
              border={{ side: 'all', style: 'solid' }}
              options={[
                {
                  label: 'Both',
                  value: 'both',
                },
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'Overflow Only',
                  value: 'overflow',
                },
                {
                  label: 'Normal Only',
                  value: 'normal',
                },
              ]}
            />
          </NameValuePair>
        </NameValueList>
      </Box>
    </Box>
  );
};

Active.args = {
  full: true,
};

const Story = {
  title: 'Navigation/OverflowNav/Active',
};

export default Story;
