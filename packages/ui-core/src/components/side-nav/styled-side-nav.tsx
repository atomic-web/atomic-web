import { Box, Drop, Text } from 'grommet';
import styled, { keyframes } from 'styled-components';
import { ColorType } from 'grommet/utils';
//@ts-ignore
import { backgroundAndTextColors } from 'grommet/utils/background';
//@ts-ignore

export const StyledSideNav = styled(Box)`
  transition:width 0.3s ease-in-out;
`;

const maxAnimation = keyframes`
   from {
      justify-content:center;
   }

   to {
     justify-content:flex-start;     
   }
`

const minAnimation = keyframes`
   from {
      justify-content:flex-start;
   }

   to {
     justify-content:center;     
   }
`

export const StyledSideNavItem = styled(Box).attrs({
  flex: false,
})<{
  hoverBackground: ColorType;
  level: number;
  plain?: boolean;
  mini?: boolean;
}>`
  &:hover *:not(.menuitem) svg {
    stroke: ${(props) =>
      backgroundAndTextColors(props.hoverBackground, null, props.theme)[1]};
  }
  ${({ plain, level, mini }) =>
    !plain && !mini && `padding-inline-start: ${level}rem;`}
  user-select: none;
  animation : ${(props)=>props.mini ? minAnimation : maxAnimation};
  animation-fill-mode :forwards;
  animation-duration:0.3s;
`;
export const StyledSideNavHeader = styled(Box).attrs({
  align: 'center',
  justify: 'center',
})``;

export const StyledSideNavBody = styled(Box).attrs({
  flex: true,
})`
  overflow: auto;
`;

export const StyledSideNavFooter = styled(Box).attrs({
  align: 'center',
  justify: 'center',
})``;

export const SideNavPopup = styled(Drop)`
  min-width: fit-content;
`;

export const SideNavItemLabel = styled(Text)`
  white-space:nowrap;
`
