import { Avatar, Box, ButtonProps, Menu, Spinner, ThemeContext } from 'grommet';
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
import { Session } from '@atomic-web/UI';
import { useAuth } from '../../auth/use-auth';
import { useRouter } from 'next/router';

const UserMenu: React.FC<unknown> = () => {
  const { t } = useTranslation('theme');
  const { signOut } = useAuth();
  const router = useRouter();

  const menuItems: ButtonProps[] = [
    {
      label: t('user-menu-item-pref'),
      icon: <System />,
    },
    {
      label: t('user-menu-item-profile'),
      icon: <UserSettings />,
    },
    {
      label: t('user-menu-item-change-pass'),
      icon: <Lock />,
    },
    {
      label: t('user-menu-item-logout'),
      icon: <Logout />,
      onClick: () =>
        signOut().then(
          (success) => success && router.push(process.env.NEXT_PUBLIC_LOGIN_URL)
        ),
    },
  ].map((item) => ({
    label: (
      <Box justify="center" pad={{ vertical: 'small' }}>
        {item.label}
      </Box>
    ),
    icon: <Box pad="small"> {item.icon} </Box>,
    ...item,
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
      <Session fallback={<Spinner />}>
        {(session) => (
          <Box direction="row" align="center">
            <FormDown />
            <Avatar
              background="background-back"
              margin={{ horizontal: 'small' }}
            >
              <Gremlin />
              {session.userName}
            </Avatar>
          </Box>
        )}
      </Session>
    </Menu>
  );
};

export { UserMenu };
