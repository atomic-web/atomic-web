import { Box, Main } from 'grommet';
import { Header } from './header';
import { SideBar } from './sidebar';
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

  return (
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
  );
}; 

export { DefaultLayout };
