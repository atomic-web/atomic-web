import { Box, Drop, Text, ThemeType } from 'grommet';
import styled, { css, keyframes } from 'styled-components';
import { ColorType, WidthType } from 'grommet/utils';
//@ts-ignore
import { backgroundAndTextColors } from 'grommet/utils/background';
//@ts-ignore
import { widthStyle } from 'grommet/utils';

const SideNavAnim = (
  miniWidth: WidthType,
  normalWidth: WidthType,
  theme: ThemeType,
  mini?: boolean
) => keyframes`
   from {
     ${widthStyle(mini ? normalWidth : miniWidth,theme)};
   }

   to {
     ${widthStyle(mini ? miniWidth : normalWidth , theme)};
   }
`;

const SideNavAnimStyle = (
  miniWidth: WidthType,
  normalWidth: WidthType,
  theme: ThemeType,
  mini?: boolean
) => css`
  animation: ${SideNavAnim(miniWidth, normalWidth, theme, mini)} 0.2s
    ease-in-out;
`;

export const StyledSideNav = styled(Box)<{
  mini?: boolean;
  miniWidth: WidthType;
  normalWidth: WidthType;
}>`
  ${({ mini, miniWidth, normalWidth,theme }) =>
    miniWidth && normalWidth && SideNavAnimStyle(miniWidth, normalWidth,theme, mini)}
`;

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
