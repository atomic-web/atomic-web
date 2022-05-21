import { Box, Button } from 'grommet';
import {
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  Bold,
  Italic,
} from 'grommet-icons';
import { Divider, DividerProps } from '../';

export default {
  title: 'DataDisplay/Divider/Vertical',
};

const TextDividerVertical = (props: Partial<DividerProps>) => (
  <Box
    width="large"
    border={{ side: 'all', color: 'light-5' }}
    margin={{ vertical: 'medium' }}
    round="small"
    direction="row"
    pad="small"
  >
    <Box>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id
      dignissim justo. Nulla ut facilisis ligula. Interdum et malesuada fames ac
      ante ipsum primis in faucibus. Sed malesuada lobortis pretium.
    </Box>
    <Divider
      orientation="vertical"
      border={{ size: 'small', color: 'light-5', style: 'solid' }}
      contentAlign="center"
      margin={{ horizontal: 'medium' }}
      {...props}
    >
      <Box margin={{ vertical: 'small' }}>Vertical</Box>
    </Divider>
    <Box>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id
      dignissim justo. Nulla ut facilisis ligula. Interdum et malesuada fames ac
      ante ipsum primis in faucibus. Sed malesuada lobortis pretium.
    </Box>
  </Box>
);

const ToolbarWithDivider = (props: Partial<DividerProps>) => (
  <Box direction="row" background="light-3" width="fit-content" margin="small">
    <Button icon={<TextAlignLeft />} />
    <Button icon={<TextAlignCenter />} />
    <Button icon={<TextAlignRight />} />
    <Divider
      orientation="vertical"
      contentAlign="center"
      border={{ size: 'small', color: 'light-5', style: 'solid' }}
      {...props}
    />
    <Button icon={<Bold />} />
    <Button icon={<Italic />} />
  </Box>
);

const Vertical = () => {
  return (
    <Box align="center" pad="medium">
      <ToolbarWithDivider />
      <ToolbarWithDivider margin={{ vertical: 'xsmall' }} />
      <TextDividerVertical />
      <TextDividerVertical textMatchFlow />
    </Box>
  );
};

export { Vertical };
