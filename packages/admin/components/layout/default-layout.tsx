import { Box, Grommet, Main } from 'grommet';
import { Header } from './header';
import { SideBar } from './sidebar';
import { atomicTheme } from '../../themes';
import { ApplicationProvider, useApplication } from '../../context';

export interface LayoutProps {
  children: React.ReactChild;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaulLayoutProps extends LayoutProps {}

const DefaultLayout = (props) => {
  const { children } = props;
  const { themeDir, themeMode } = useApplication();

  return (
    <Grommet full theme={atomicTheme} dir={themeDir} themeMode={themeMode}>
      <Box direction="row" fill>
        <SideBar />
        <Box flex>
          <Header />
          <Main background="background-back" pad="medium">
            {children}
          </Main>
        </Box>
      </Box>
    </Grommet>
  );
};

const LayoutWithAppProvider = () => (
  <ApplicationProvider>
    <DefaultLayout />
  </ApplicationProvider>
);

export { LayoutWithAppProvider as DefaultLayout };
