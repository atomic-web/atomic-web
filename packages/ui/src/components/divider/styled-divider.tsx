import { Box } from 'grommet';
import { BorderType, ColorType, WidthType } from 'grommet/utils';
//@ts-ignore
import { borderStyle } from 'grommet/utils';
import styled from 'styled-components';
import { DividerContentAlignType } from '.';

const orderFromAlign = (
  align: DividerContentAlignType = 'start',
  dir: 'rtl' | undefined
) => {
  switch (align) {
    case 'start':
      return '-1';
    case 'center':
      return '0';
    case 'end':
      return '2';
    case 'right':
      return dir === 'rtl' ? '-1' : '2';
    case 'left':
      return dir === 'rtl' ? '2' : '-1';
    default:
      return '1';
  }
};

const getBorderStyle = (border: BorderType): string => {
  if (typeof border === 'boolean' && border) {
    return 'solid';
  }

  if (typeof border === 'string') {
    return 'solid';
  }

  return (border as unknown as Record<string, unknown>)['style'] as string;
};

export const StyledDivider = styled(Box).withConfig({
  shouldForwardProp: (p) => !['border'].includes(p),
})<{
  orient?: 'horizontal' | 'vertical';
  textMatchFlow?: boolean;
  dir?: 'rtl' | undefined;
  contentAlign?: DividerContentAlignType;
  color?: ColorType;
  border: BorderType;
  offset?: WidthType;
}>`
  &:before,
  &:after {
    content: '';
    flex: 1;
    border: 0;

    ${({ border, theme }) => borderStyle(border, false, theme)}
    border-style:none;

    ${({ orient }) =>
      orient === 'horizontal'
        ? `border-block-start-style`
        : `border-inline-start-style`} : ${({ border }) =>
      getBorderStyle(border)};
  }

  ${({ orient }) =>
    orient === 'horizontal' ? `align-items:center` : `align-items:center`};

  &:before {
    ${({ contentAlign, offset }) =>
      !offset && contentAlign !== 'center' && 'display:none'};
    ${({ contentAlign, dir, offset }) =>
      offset &&
      (contentAlign === 'start' ||
        (dir === 'rtl' && contentAlign === 'right') ||
        (dir !== 'rtl' && contentAlign === 'left')) &&
      `
       flex-grow:0;
       flex-basis:${offset};
    `};
  }

  &:after {
    ${({ contentAlign, dir, offset }) =>
      offset &&
      (contentAlign === 'end' ||
        (dir !== 'rtl' && contentAlign === 'right') ||
        (dir === 'rtl' && contentAlign === 'left')) &&
      `
       flex-grow:0;
       flex-basis:${offset};
    `};
  }

  & > *:nth-child(1) {
    ${({ textMatchFlow, orient }) =>
      textMatchFlow && orient === 'vertical' && `writing-mode:vertical-rl;`}
    order: ${({ contentAlign, dir, offset }) =>
      offset ? '0' : orderFromAlign(contentAlign, dir)};
    max-width: initial;
  }
`;
