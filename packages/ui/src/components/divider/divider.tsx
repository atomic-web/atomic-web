import { Box, ThemeContext } from 'grommet';
import {
  AlignSelfType,
  BorderType,
  ColorType,
  HeightType,
  MarginType,
  PolymorphicType,
  WidthType,
} from 'grommet/utils';
import { useContext } from 'react';
import { ThemeType } from '../../shared/types/theme';
import { StyledDivider } from './styled-divider';

export type DividerContentAlignType =
  | 'start'
  | 'center'
  | 'end'
  | 'right'
  | 'left';

export interface DividerProps {
  tag?: PolymorphicType;
  width?: WidthType;
  height?: HeightType;
  alignSelf?: AlignSelfType;
  justifySelf?: AlignSelfType;
  children?: React.ReactNode;
  textMatchFlow?: boolean;
  orientation?: 'horizontal' | 'vertical';
  contentAlign?: DividerContentAlignType;
  margin?: MarginType;
  color?: ColorType;
  border?: BorderType;
  offset?:WidthType;
}

const Divider: React.FC<DividerProps> = (props) => {
  const {
    orientation = 'horizontal',
    contentAlign = 'start',
    textMatchFlow,
    alignSelf,
    children,
    border: borderProp,
    offset,
    width,
    height,
    margin,
    color,
    tag,
  } = props;

  const horiz = orientation === 'horizontal';
  const { dir } = useContext<ThemeType>(ThemeContext);

  const content =
    typeof children === 'string' ? (
      <Box margin="small">{children}</Box>
    ) : (
      children
    );

  const border = borderProp ?? {
    color: 'dark-1',
    syled: 'solid',
    side: 'all',
  };

  return (
    <StyledDivider
      margin={margin}
      width={horiz ? width : undefined}
      height={!horiz ? height : undefined}
      textMatchFlow={textMatchFlow}
      tag={tag}
      children={content}
      orient={orientation}
      direction={horiz ? 'row' : 'column'}
      alignSelf={alignSelf}
      contentAlign={contentAlign}
      border={border}
      offset={offset}
      //@ts-ignore
      color={color}
      dir={dir}
      flex={!horiz ? { grow: 1, shrink: 0 } : undefined}
      basis={!horiz ? 'fit-content' : undefined}
    />
  );
};

export { Divider };
