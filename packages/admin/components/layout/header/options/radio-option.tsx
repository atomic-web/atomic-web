import { Box } from 'grommet';

export const RadioOption = (option, { checked, focus, hover }, icon) => {
  const Icon = icon(option);
  let background;
  if (checked) background = 'brand';
  else if (hover) background = 'light-4';
  else if (focus) background = 'light-4';
  else background = 'light-2';
  return (
    <Box background={background} pad="xsmall" round="full">
      <Icon />
    </Box>
  );
};
