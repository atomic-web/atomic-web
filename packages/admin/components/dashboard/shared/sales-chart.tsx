import { Box, DataChart } from 'grommet';
import { Widget } from './widget';
import random from 'lodash/random';

const salesData = Array(12)
  .fill(0)
  .map((_, index) => ({
    month: new Date(new Date().getFullYear(), index, 1).toLocaleString(
      'default',
      { month: 'short' }
    ),
    sales: index === 0 ? 0 : random(5000, 10000),
  }));

const SalesChart: React.FC<unknown> = () => {
  return (
    <Widget
      header={{
        content: <Box>Sales Report</Box>,
      }}
      background="background-front"
    >
      <DataChart
        pad={{ horizontal: 'small' }}
        size={{ width: 'fill' }}
        data={salesData}
        series={[{
            property : 'month',
        }, {
            property :'sales',
            suffix:"$"
        }]}
        chart={[
          {
            property: 'sales',
            type: 'area',
            thickness: 'xxsmall',
            color: 'neutral-1',
            round: true,
            opacity: 'medium',
          },
          {
            property: 'sales',
            type: 'line',
            thickness: 'xxsmall',
            color: 'neutral-1',
          },
        ]}
        axis={{
          x: { property: 'month', granularity: 'fine' },
          y: { property: 'sales', granularity: 'fine' },
        }}
        guide={{ y: { granularity: 'fine' } }}
        legend
        detail
      />
    </Widget>
  );
};

export { SalesChart };
