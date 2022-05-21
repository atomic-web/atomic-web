import { Box } from 'grommet';
import {
  Catalog,
  CirclePlay,
  Code,
  Network,
  Optimize,
  RadialSelected,
  ShieldSecurity,
  Template,
} from 'grommet-icons';
import styled from 'styled-components';
import { OverflowNavItemProps } from '../../types';

const Chip = styled(Box).attrs({
  pad: { horizontal: 'small' },
  round: 'large',
  background: 'light-4',
  margin: { start: 'small' },
})`
  font-size: 10px;
`;

const menuItems: OverflowNavItemProps[] = [
  {
    icon: <Code/>,
    label: 'Code',
    active: true,
  },
  {
    icon: <RadialSelected/>,
    label: (
      <Box direction="row" align="center">
        Issues <Chip> 150 </Chip>
      </Box>
    ),
  },
  {
    icon: <Network/>,
    label: 'Pull Requests',
  },
  {
    icon: <CirclePlay/>,
    label: 'Actions',
  },
  {
    icon: <Template/>,
    label: 'Projects',
  },
  {
    icon: <Catalog/>,
    label: 'Wiki',
  },
  {
    icon: <ShieldSecurity/>,
    label: 'Security',
    active:true
  },
  {
    icon: <Optimize/>,
    label: 'Insights',
  },
];

export default menuItems;
