import { Box, Drop } from 'grommet';
import styled from 'styled-components';
import { ColorType } from 'grommet/utils';
//@ts-ignore
import { backgroundAndTextColors } from 'grommet/utils/background';

export const StyledSideNav = styled(Box)``;

export const StyledSideNavItem = styled(Box).attrs({
  flex: false,
})<{ hoverBackground: ColorType; level: number; plain?: boolean }>`
  &:hover *:not(.menuitem) svg {
    stroke: ${(props) =>
      backgroundAndTextColors(props.hoverBackground, null, props.theme)[1]};
  }
  ${({plain,level}) =>
    !plain && `padding-inline-start: ${level}rem;`
  }
  user-select: none;
`;

export const StyledSideNavHeader = styled(Box).attrs({
  align: 'center',
  justify: 'center',
})`
   $({plain})=>!plain &&  
`;

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
   min-width:fit-content;
`