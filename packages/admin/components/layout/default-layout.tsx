import { Box, Grommet, Main } from 'grommet';
import { Header } from './header';
import { SideBar } from './sidebar';
import { atomicTheme } from '../../themes';
import { ApplicationProvider } from '../../context';

export interface LayoutProps {
  children: React.ReactChild;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaulLayoutProps extends LayoutProps {}

const DefaultLayout = (props) => {
  const { children } = props;

  return (
    <Grommet full theme={atomicTheme}>
      <ApplicationProvider>
        <Box direction="row" fill>
          <SideBar />
          <Box flex>
            <Header />
            <Main background="background-back" pad="medium">
              {children}
            </Main>
          </Box>
        </Box>
      </ApplicationProvider>
    </Grommet>
  );
};

export { DefaultLayout };
