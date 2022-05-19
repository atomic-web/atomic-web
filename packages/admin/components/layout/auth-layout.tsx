import { Page, PageContent } from 'grommet';

const AuthLayout = ({ children }) => {
  return (
    <Page fill>
      <PageContent
        width="large"
        fill="vertical"
        align='center'
        justify='center'
        margin={{ vertical: 'medium' }}
      >
        {children}
      </PageContent>
    </Page>
  );  
};

export { AuthLayout };
