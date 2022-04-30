import { Avatar, Box, ButtonProps, Menu, ThemeContext } from 'grommet';
import {
  FormDown,
  Gremlin,
  Lock,
  Logout,
  System,
  UserSettings,
} from 'grommet-icons';
import { AtomicThemeType } from '../../../themes/atomic-theme';
import { useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';

const UserMenu: React.FC<unknown> = () => {

  const {t} = useTranslation('theme');  

  const menuItems: ButtonProps[] = [
    {
      label: t('user-menu-item-pref'),
      icon: <System />,
    },
    {
      label: t('user-menu-item-pref'),
      icon: <UserSettings />,
    },
    {
      label: t('user-menu-item-change-pass'),
      icon: <Lock />,
    },
    {
      label: t('user-menu-item-logout'),
      icon: <Logout />,
    },
  ].map((item) => ({
    label: (
      <Box justify="center" pad={{ vertical: 'small' }}>
        {item.label}
      </Box>
    ),
    icon: <Box pad="small"> {item.icon} </Box>,
  }));

  const { dir }: AtomicThemeType = useContext(ThemeContext);

  return (
    <Menu
      items={menuItems}
      dropProps={{
        margin: { top: 'small' },
      }}
      dropAlign={{
        top: 'bottom',
        [!dir ? 'right' : 'left']: !dir ? 'right' : 'left',
      }}
    >
      <Box direction="row" align="center">
        <FormDown />
        <Avatar background="background-back" margin={{ horizontal: 'small' }}>
          <Gremlin />
        </Avatar>
      </Box>
    </Menu>
  );
};

export { UserMenu };
