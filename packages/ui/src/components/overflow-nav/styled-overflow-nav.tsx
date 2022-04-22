import { Box, BoxProps } from 'grommet';
import styled from 'styled-components';
import { AnchorHTMLAttributes } from 'react';
//@ts-ignore
import { backgroundStyle } from 'grommet/utils/background';

export const StyledOverflowNav = styled(Box)`
  margin: 0;
  padding: 0;
`;

export const StyledOverflowNavContainer = styled(Box)<{
  fitContent: boolean;
  isHorizontal: boolean;
}>`
  ${(props) =>
    props.fitContent && !props.isHorizontal && `max-width:fit-content`}
`;

export const StyledOverflowNavItem = styled(Box)`
  min-width: fit-content;
  min-height: fit-content;
  width: auto;
`;

export const StyledOverflowNavOverflowItem = styled(Box)`
  & > div {
  ${(props) =>
      backgroundStyle(props.background, props.theme, props.theme.button.color)};
  }
`;

export const StyledOverflowNavItemLink = styled(Box).attrs({
  direction: 'row',
})<BoxProps & AnchorHTMLAttributes<unknown>>``;

export const StyledOverflowNavItemIcon = styled(Box)`
  stroke: green;
  margin-inline-end: 0.5em;
`;
export const StyledOverflowNavItemLabel = styled(Box).attrs({ tag: 'span' })``;
