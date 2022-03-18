import { BoxProps } from 'grommet';
import { DirectionType, PolymorphicType } from 'grommet/utils';
import React, { HTMLAttributeAnchorTarget, MouseEventHandler } from 'react';
import { MenuItemProps } from '../../shared/types/menu-item';

export type OverflowNavDirection = DirectionType;

export type OverflowNavItemProps<TItem extends object = object , TElement extends HTMLElement = HTMLElement> = TItem &
  MenuItemProps & {
    order?: number;
    link?: string;
    target?: HTMLAttributeAnchorTarget;
    tag?: PolymorphicType;
    onClick?: MouseEventHandler<TElement>;
    _id?: string;
  };

export type OverflowNavProps<TItem extends object = object> = BoxProps &
  Partial<Pick<HTMLElement, 'className'>> & {
    items: OverflowNavItemProps<TItem>[];
    direction?: OverflowNavDirection;
    itemTag?: PolymorphicType;
    tag?: PolymorphicType;
    fitContent?: boolean;
    plain?: boolean;
    renderItem?: (
      item: OverflowNavItemProps<TItem>
    ) => string | React.ReactElement | React.ComponentType;
  };
