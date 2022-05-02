import { Button } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
import { useApplication } from '../../../context';

const SideBarToggle: React.FC<unknown> = () => {
  const { toggleSideBar } = useApplication();

  return <Button icon={<MenuIcon />} onClick={toggleSideBar} />;
};

export { SideBarToggle };
