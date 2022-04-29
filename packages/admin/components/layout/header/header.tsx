import { Header as GrommetHeader } from 'grommet';

export interface HeaderProps {
  sticky?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { sticky } = props;
  return (
    <GrommetHeader
      sticky={sticky ? 'scrollup' : undefined}
      pad="small"
    >
    </GrommetHeader>
  );
};

export { Header };
