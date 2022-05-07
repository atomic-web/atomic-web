import { Box, Grid, ResponsiveContext } from 'grommet';
import { isMediumUp } from '../../../utils/types/responsive-utils';
import { BrowserUsageChart } from '../shared/browser-usage-chart';
import { SalesChart } from '../shared/sales-chart';
import { Tiles } from '../shared/tiles';
import { Projects } from './projects';

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
          <Grid columns={isMediumUp(size) ? ['1fr' ,'1fr'] : ['full']}>
              <Projects/>
          </Grid>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export { DefaultDashboard };
