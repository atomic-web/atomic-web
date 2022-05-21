import { Avatar, Box, BoxProps, Paragraph, Text } from 'grommet';
import { Briefcase, Folder, Gremlin, Image, Sun } from 'grommet-icons';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Divider, DividerProps } from '../';

export default {
  title: 'DataDisplay/Divider/Horizontal',
};

const ListDevider = (props: Partial<DividerProps>) => (
  <Divider
    orientation="horizontal"
    contentAlign="center"
    offset="xxsmall"
    border={{ size: 'small', color: 'light-5', style: 'solid' }}
    {...props}
  />
);

const StyledList = styled(Box).attrs({ tag: 'ul' })`
  list-style-type: none;
  padding: 0;
`;
const StyledListItem = styled(Box).attrs({ tag: 'li' })`
  padding: 1em;
`;

const ListItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
}> = (props) => {
  const { icon, title, desc } = props;
  return (
    <StyledListItem direction="row" align="center" width="medium">
      <Avatar background="light-3" margin={{ end: 'small' }}>
        {icon}
      </Avatar>
      <Box>
        <Text> {title} </Text>
        <Paragraph color="dark-5" margin="0">
          {desc}
        </Paragraph>
      </Box>
    </StyledListItem>
  );
};

const List = (props: PropsWithChildren<BoxProps>) => (
  <StyledList {...props}>{props.children}</StyledList>
);

const DividedList = () => (
  <List background="light-1">
    <ListItem icon={<Image />} title="Photos" desc="Jan 8, 2022" />
    <ListDevider tag="li" margin={{ start: '4em' }} />
    <ListItem icon={<Briefcase />} title="Work" desc="Octobor 15, 2022" />
    <ListDevider tag="li" margin={{ start: '4em' }} />
    <ListItem icon={<Sun />} title="Vacation" desc="December 18, 2022" />
  </List>
);

const LoremIpsum = () => (
  <Box>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id
    dignissim justo. Nulla ut facilisis ligula. Interdum et malesuada fames ac
    ante ipsum primis in faucibus. Sed malesuada lobortis pretium.
  </Box>
);

const Horizontal = () => {
  return (
    <Box align="center" pad="medium">
      <DividedList />
      <Box
        pad="medium"
        border={{ side: 'all', style: 'solid', color: 'light-5' }}
        round="small"
        width="large"
      >
        <ListDevider margin={{ vertical: 'medium' }} contentAlign="center">
          <Box
            pad="small"
            background="light-5"
            round="medium"
            margin={{ horizontal: 'small' }}
          >
            CUSTOM ELEMENT
          </Box>
        </ListDevider>
        <LoremIpsum />
        <ListDevider margin={{ vertical: 'medium' }}> CENTER </ListDevider>
        <LoremIpsum />
        <ListDevider margin={{ vertical: 'medium' }} contentAlign="start">
          <Box direction="row" align="center">
            <Avatar background="brand">
              <Gremlin />
            </Avatar>
            <Text margin={{ horizontal: 'small' }}>START</Text>
          </Box>
        </ListDevider>
        <LoremIpsum />
        <ListDevider margin={{ vertical: 'medium' }} contentAlign="end">
          <Box direction="row-reverse" align="center">
            <Avatar background="light-5">
              <Folder />
            </Avatar>
            <Text margin={{ horizontal: 'small' }}>END</Text>
          </Box>
        </ListDevider>
        <LoremIpsum />
        <ListDevider margin={{ vertical: 'medium' }} contentAlign="left">
          LEFT
        </ListDevider>
        <LoremIpsum />
        <ListDevider margin={{ vertical: 'medium' }} contentAlign="right">
          RIGHT
        </ListDevider>
      </Box>
    </Box>
  );
};

export { Horizontal };
