import { Box, Footer, Grid, ResponsiveContext, Text } from 'grommet';
import { Location, ShieldSecurity, System, Tasks } from 'grommet-icons';
import { useContext } from 'react';
import { Identifier } from './identifier';
import { Tile } from './tile';
import useTranslate from 'next-translate/useTranslation';

const tileSizeMap = {
  xsmall: 'large',
  small: 'large',
  medium: 'small',
  large: 'small',
  xlarge: 'small',
};

const Tiles: React.FC<unknown> = () => {
  const { t } = useTranslate('theme');

  const data = [
    {
      color: 'neutral-1',
      icon: <System size="large" />,
      title: t('dashboard-tile-title-system'),
      subTitle: t('dashboard-tile-subtitle-system'),
      message: t('dashboard-tile-msg-system'),
    },
    {
      color: 'neutral-2',
      icon: <Tasks size="large" />,
      title: t('dashboard-tile-title-logs'),
      subTitle: t('dashboard-tile-subtitle-logs'),
      message: t('dashboard-tile-msg-logs'),
    },
    {
      color: 'neutral-3',
      icon: <Location size="large" />,
      title: t('dashboard-tile-title-beacons'),
      subTitle: t('dashboard-tile-subtitle-beacons'),
      message: t('dashboard-tile-msg-beacons'),
    },
    {
      color: 'neutral-4',
      icon: <ShieldSecurity size="large" />,
      title: t('dashboard-tile-title-security'),
      subTitle: t('dashboard-tile-subtitle-security'),
      message: t('dashboard-tile-msg-security'),
    },
  ];

  const size = useContext(ResponsiveContext);

  return (
    <Grid
      columns={{
        count: size === 'medium' ? 2 : 'fit',
        size: tileSizeMap[size],
      }}
      gap="small"
    >
      {data.map((value) => (
        <Tile
          background={value.color}
          key={`Tile${value.title}`}
          alignContent="center"
          responsive={false}
        >
          <Identifier
            pad={{ horizontal: 'medium', vertical: 'small' }}
            title={value.title}
            subTitle={value.subTitle}
            size="small"
            gap="medium"
            direction="column"
            align="left"
          >
            {value.icon}
          </Identifier>
          <Box flex />
          <Footer pad="small" background="background-contrast">
            <Text size="xsmall" color="text-strong">
              {value.message}
            </Text>
            {value.message === 'Connected' && (
              <Box round pad="xsmall" background="green" />
            )}
          </Footer>
        </Tile>
      ))}
    </Grid>
  );
};

export { Tiles };
