import { Box, Meter, NameValueList, NameValuePair, Text } from 'grommet';
import { Chrome } from 'grommet-icons';
import styled from 'styled-components';
import { Widget } from '../shared/widget';

const Legend = styled(Box)`
  width: 20px;
  height: 20px;
  margin-inline-end: 1em;
`;

const BrowserUsageChart: React.FC<unknown> = () => {
  const values = [
    {
      value: 20,
      label: 'Firefox',
      color: 'neutral-1',
    },
    {
      value: 60,
      label: 'Chrome',
      color: 'neutral-2',
    },
    {
      value: 10,
      label: 'Edge',
      color: 'neutral-3',
    },
    {
      value: 10,
      label: 'Safari',
      color: 'neutral-4',
    },
  ];

  return (
    <Widget
      header={{
        icon: <Chrome />,
        title: 'Browser Usage',
      }}
      background="background-front"
    >
      <Box align="center">
        <Box width="small">
          <Meter type="pie" values={values} size="full" />
        </Box>
        <NameValueList
          margin={{ top: 'medium' }}
          columns={{ count: 4, size: 'auto' }}
          pairProps={{
            direction: 'column',
          }}
          valueProps={{ width: '20px' }}
          nameProps={{ width: '20px' }}
        >
          {values.map((value, index) => (
            <Box key={index} align="center">
              <NameValuePair name={value.label}>
                <Box>
                  <Text>{value.value}%</Text>
                  <Legend background={value.color} />
                </Box>
              </NameValuePair>
            </Box>
          ))}
        </NameValueList>
      </Box>
    </Widget>
  );
};

export { BrowserUsageChart };
