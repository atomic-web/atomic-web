import { Box, Grid } from 'grommet';
import { SalesChart } from '../shared/statistics';
import { Tiles } from '../shared/tiles';

const DefaultDashboard: React.FC<unknown> = () => {
  return (
    <Box>
      <Tiles />
      <Grid columns={['2fr' , '1fr']} gap="small">
        <SalesChart />
         
      </Grid>
    </Box>
  );
};

export { DefaultDashboard };
