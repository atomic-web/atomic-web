import { Widget } from '../shared/widget';
import { faker } from '@faker-js/faker';
import { Avatar, Box, DataTable, Meter, Text, Tip } from 'grommet';
import { Briefcase } from 'grommet-icons';

const priorityColors = [
  'status-critical',
  'status-warning',
  'status-ok',
  'status-unknown',
];

const priorityNames = ['critical', 'high', 'normal', 'low'];

const Projects: React.FC<unknown> = () => {
  const projects = Array(10)
    .fill(0)
    .map((_, index) => ({
      id: index,
      name: faker.name.jobArea(),
      priority: faker.datatype.number({
        min: 0,
        max: 3,
      }),
      progress: parseInt((Math.random() * 100).toFixed(0)),
      assigne: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        avatar: faker.internet.avatar(),
      },
    }));

  return (
    <Widget
      header={{
        title: 'Projects',
        icon: <Briefcase />,
      }}
      background="background-front"
    >
      <DataTable
        data={projects}
        columns={[
          {
            property: 'name',
            header: 'Name',
          },
          {
            property: 'progress',
            header: 'Progress',
            render: ({ progress }) => (
              <Box>
                <Text weight="bold"> {progress}% </Text>
                <Meter
                  type="bar"
                  value={progress}
                  size="xxsmall"
                  thickness="xsmall"
                />
              </Box>
            ),
          },
          {
            property: 'assigne',
            header: 'Assigne',
            render: ({ assigne: { name, avatar } }) => (
              <Box direction="row" align="center">
                <Avatar src={avatar} margin={{ end: 'small' }} />
                <Text>{name} </Text>
              </Box>
            ),
          },
          {
            property: 'priority',
            header: 'Priority',
            render: ({ priority }) => (
              <Box align="center">
                <Tip
                  content={priorityNames[priority]}
                  dropProps={{
                    align: { bottom: 'top' },
                  }}
                >
                  <Box
                    round="full"
                    width="0.7em"
                    height="0.7em"
                    background={priorityColors[priority]}
                  />
                </Tip>
              </Box>
            ),
          },
        ]}
      />
    </Widget>
  );
};

export { Projects };
