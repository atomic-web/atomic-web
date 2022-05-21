import {
  Anchor,
  Avatar,
  Box,
  Button,
  Layer,
  ResponsiveContext,
  Stack,
  ThemeContext,
} from 'grommet';
import { SideNav, StyledSideNavItem } from '@atomic-web/ui-core';
import styled from 'styled-components';
import { menuItems } from './side-nav-items';
import { Gremlin, Logout, FormPreviousLink, FormNextLink } from 'grommet-icons';
import { Branding } from './branding';
import { useApplication } from '../../../context';
import { Fragment, useContext, useMemo } from 'react';
import { WrapIf } from '../../utils';
import { AtomicThemeType } from '../../../themes/atomic-theme';

const StyledSideNav = styled(SideNav)`
  & ${StyledSideNavItem}.mini svg {
    padding: 10px;
    background-color: #ddd;
    border-radius: 5px;
  }
  & ${StyledSideNavItem}.mini:hover svg {
    background-color: #f1f1f1;
  }
`;

const SideBar: React.FC = () => {
  const { sideBarState, toggleSideBar } = useApplication();

  const size = useContext(ResponsiveContext);
  const { dir }: AtomicThemeType = useContext(ThemeContext);
  const isSmallScreen = !['xlarge', 'large', 'medium'].includes(size);
  const isMini = sideBarState === 'min';

  const sideNavProps = useMemo(() => {
    return {
      mini: !isSmallScreen && isMini,
    };
  }, [isMini, isSmallScreen]);

  return (
    <Box fill="vertical" background="brand">
      <WrapIf
        condition={isSmallScreen}
        wrap={(children) => (
          <Fragment>
            {!isMini && (
              <Layer
                background="brand"
                full="vertical"
                position={!dir ? 'left' : 'right'}
                onClickOutside={toggleSideBar}
                onEsc={toggleSideBar}
                responsive={true}
                modal={false}
              >
                {children}
              </Layer>
            )}
          </Fragment>
        )}
      >
        <StyledSideNav
          items={menuItems}
          itemHoverBackground="light-4"
          fill="vertical"
          width={isSmallScreen ? 'fill' : '300px'}
          miniWidth="80px"
          {...sideNavProps}
          header={({ mini }) => (
            <Stack fill anchor={!dir ? 'right' : 'left'}>
              <Box align="center">
                <Box direction="row" align="center">
                  {mini && (
                    <Avatar background="brand" size={mini ? '2em' : 'medium'}>
                      <Gremlin />
                    </Avatar>
                  )}
                  {!mini && <Branding />}
                </Box>
              </Box>
              {isSmallScreen && (
                <Button
                  onClick={toggleSideBar}
                  plain
                  icon={
                    !dir ? (
                      <FormPreviousLink size="large" />
                    ) : (
                      <FormNextLink size="large" />
                    )
                  }
                />
              )}
            </Stack>
          )}
          footer={({ mini }) => (
            <Box direction="row" pad="small">
              <Logout />
              {!mini && <Anchor margin={{ start: 'small' }}>Logout</Anchor>}
            </Box>
          )}
        />
      </WrapIf>
    </Box>
  );
};

export { SideBar };
