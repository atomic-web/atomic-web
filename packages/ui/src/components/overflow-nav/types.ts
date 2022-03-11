import { BoxProps } from 'grommet';
import { DirectionType, PolymorphicType } from 'grommet/utils';
import React, { HTMLAttributeAnchorTarget, MouseEventHandler } from 'react';

export type OverflowNavDirection = DirectionType;

export type OverflowNavItem<TItem extends object = object> = TItem & {
  label: string | React.ReactElement | React.ComponentType;
  icon?: React.ComponentType | React.ReactElement | string;
  order?: number;
  link?: string;
  target?: HTMLAttributeAnchorTarget;
  tag?: PolymorphicType;
  onClick?: MouseEventHandler<any>;
  _id?: string;
};

export type OverflowNavProps<TItem extends object = object> = BoxProps &
  Partial<Pick<HTMLElement, 'className'>> & {
    items: OverflowNavItem<TItem>[];
    direction?: OverflowNavDirection;
    itemTag?: PolymorphicType;
    tag?: PolymorphicType;
    fitContent?: boolean;
    plain?:boolean,
    renderItem?: (
      item: OverflowNavItem<TItem>
    ) => string | React.ReactElement | React.ComponentType;
  };
