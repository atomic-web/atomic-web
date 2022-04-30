import { Box, Header as GrommetHeader } from 'grommet';
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
      direction='row-reverse'
    >
         <UserMenu/>
    </GrommetHeader>
  );
};

export { Header };
