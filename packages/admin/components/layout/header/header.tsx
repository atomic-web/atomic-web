import { Box, Header as GrommetHeader } from 'grommet';
import { SideBarToggle } from './sidebar-toggle';
import { UserMenu } from './user-menu';

export interface HeaderProps {
  sticky?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { sticky } = props;
  return (
    <GrommetHeader
      sticky={sticky ? 'scrollup' : undefined}
      pad="small"
      direction="row-reverse"
    >
      <Box>
        <UserMenu />
      </Box>
      <Box>
         <SideBarToggle/>
      </Box>
    </GrommetHeader>
  );
};

export { Header };
