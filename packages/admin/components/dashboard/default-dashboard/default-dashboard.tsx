import { Box, Grid, ResponsiveContext } from 'grommet';
import { isMediumUp } from '../../../utils/types/responsive-utils';
import { BrowserUsageChart } from '../shared/browser-usage-chart';
import { SalesChart } from '../shared/sales-chart';
import { Tiles } from '../shared/tiles';

const DefaultDashboard: React.FC<unknown> = () => {
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box>
          <Tiles />
          <Grid
            columns={isMediumUp(size) ? ['2fr' ,'1fr'] : ['full']}
            gap="medium"
            margin={{ vertical: 'medium' }}
          >
            <SalesChart />
            <BrowserUsageChart />
          </Grid>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export { DefaultDashboard };
