import { BoxProps } from 'grommet';
import { BackgroundType, DirectionType, PolymorphicType } from 'grommet/utils';
import React, { HTMLAttributeAnchorTarget, MouseEventHandler } from 'react';
import { MenuItemProps } from '../../shared/types/menu-item';

export type OverflowNavDirection = DirectionType;

export type OverflowNavItemProps<TItem extends object = object , TElement extends HTMLElement = HTMLElement> = TItem &
  MenuItemProps & {
    order?: number;
    link?: string;
    target?: HTMLAttributeAnchorTarget;
    tag?: PolymorphicType;
    active?:boolean,
    onClick?: MouseEventHandler<TElement>;
    _id?: string;
  };

type ActiveIndicatorFunc = (overflow : boolean)=> boolean | BackgroundType;

export type OverflowNavProps<TItem extends object = object> = BoxProps &
  Partial<Pick<HTMLElement, 'className'>> & {
    items: OverflowNavItemProps<TItem>[];
    direction?: OverflowNavDirection;
    itemTag?: PolymorphicType;
    tag?: PolymorphicType;
    fitContent?: boolean;
    plain?: boolean;
    activeIndicator? : boolean | BackgroundType | ActiveIndicatorFunc,
    renderItem?: (
      item: OverflowNavItemProps<TItem>
    ) => string | React.ReactElement | React.ComponentType;
  };
