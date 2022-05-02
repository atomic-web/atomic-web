import { Box, Grommet, Main } from 'grommet';
import { Header } from './header';
import { SideBar } from './sidebar';
import { atomicTheme } from '../../themes';
import { ApplicationProvider, useApplication } from '../../context';
import styled from 'styled-components';

export interface LayoutProps {
  children: React.ReactChild;
}

const Body = styled(Box)`
  height: 100vh;
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaulLayoutProps extends LayoutProps {}

const DefaultLayout = (props) => {
  const { children } = props;
  const { themeDir, themeMode } = useApplication();

  return (
    <Grommet full theme={atomicTheme} dir={themeDir} themeMode={themeMode}>
      <Box direction="row" fill>
        <SideBar />
        <Body flex>
          <Header />
          <Box flex overflow="auto">
            <Main background="background-back" pad="medium">
              <div>
              {children}
              </div>
            </Main>
          </Box>
        </Body>
      </Box>
    </Grommet>
  );
};

const LayoutWithAppProvider = ({ children }) => (
  <ApplicationProvider>
    <DefaultLayout>{children}</DefaultLayout>
  </ApplicationProvider>
);

export { LayoutWithAppProvider as DefaultLayout };
