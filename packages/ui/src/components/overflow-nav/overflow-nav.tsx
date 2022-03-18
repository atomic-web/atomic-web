import React, { useContext, useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import { OverflowNavItemProps, OverflowNavProps } from './types';
import {
  StyledOverflowNav,
  StyledOverflowNavContainer,
  StyledOverflowNavItem,
  StyledOverflowNavItemIcon,
  StyledOverflowNavItemLabel,
  StyledOverflowNavItemLink,
} from './styled-overflow-nav';
import { sortBy, uniqBy } from 'remeda';
import { Anchor, Menu, ThemeContext } from 'grommet';
import { More } from 'grommet-icons';
import { ReactElement } from 'react';
import { PolymorphicType } from 'grommet/utils';
import { ThemeType } from '../../shared/types/theme';

const OverflowNav= forwardRef<HTMLDivElement,OverflowNavProps>((props,ref) => {
  const {
    direction = 'row',
    fitContent = true,
    className,
    itemTag,
    items,
    plain,
    tag,
    renderItem: renderItemProp,
    ...rest
  } = props;

  const isHorizontal = ['row', 'row-reverse', 'row-responsive'].includes(
    direction
  );

  const [overflowItems, setOverflowItems] = useState<OverflowNavItemProps[]>([]);
  const themeContext: ThemeType = useContext(ThemeContext);

  const containerRef = useRef<HTMLDivElement>(null);

  const localItems = useMemo(() => {
    items.forEach((item, idx) => {
      if (!item.order) {
        item.order = idx;
        item._id = idx.toString();
      }
    });

    return sortBy(items, [i => i.order as number, 'asc']);
  }, [items]);

  const renderIcon = (icon?: ReactElement | string | PolymorphicType) =>
    !icon ? undefined:
    React.isValidElement(icon) || typeof icon === 'string' ? (
      <StyledOverflowNavItemIcon>{icon}</StyledOverflowNavItemIcon>
    ) : (
      <StyledOverflowNavItemIcon as={icon}></StyledOverflowNavItemIcon>
    );

  const renderItem = (item: OverflowNavItemProps) => (
    <StyledOverflowNavItem
      key={item._id}
      direction="row"
      align="center"
      fill={isHorizontal ? 'horizontal' : 'vertical'}
      className="overflow-nav-item"
      data-item-id={item._id}
      onClick={item.onClick}
      tag={item.tag ?? itemTag ?? 'li'}
      pad={plain ? undefined : 'small'}
    >
      {renderItemProp ? (
        renderItemProp(item)
      ) : (
        <StyledOverflowNavItemLink
          tag={item.link ? Anchor : React.Fragment}
          direction="row"
          target={item.target}
          href={item.link}
        >
          {item.icon && renderIcon(item.icon)}
          <StyledOverflowNavItemLabel>{item.label}</StyledOverflowNavItemLabel>
        </StyledOverflowNavItemLink>
      )}
    </StyledOverflowNavItem>
  );

  const sortedOverflowItems = useMemo(() => {
    return sortBy(
      uniqBy(
        overflowItems.map((_item) => ({
          ..._item,
          icon: renderIcon(_item.icon),
        })),
        (item) => item._id
      ),
      [(item) => item.order as number, 'asc']
    );
  }, [overflowItems]);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (localItems) {
      const handleObservation = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(({ intersectionRatio, target }) => {
          const item = localItems.find(
            (i) => i._id === target.getAttribute('data-item-id')
          );

          const isHidden = intersectionRatio < 1;
          (target as HTMLDivElement).style.visibility = isHidden
            ? 'hidden'
            : 'visible';

          if (item) {
            if (isHidden) {
              setOverflowItems((_items) => [..._items, item]);
            } else {
              setOverflowItems((_items) =>
                _items.filter((_item) => _item !== item)
              );
            }
          }
        });
      };

      if (containerRef.current) {
        const container = containerRef.current;
        observer = new IntersectionObserver(handleObservation, {
          root: container,
          rootMargin: '1px',
          threshold: 1,
        });

        const itemsElements = container.querySelectorAll('.overflow-nav-item');

        itemsElements.forEach((_item) => {
          observer.observe(_item);
        });
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [localItems]);

  return (
    <StyledOverflowNavContainer
      direction={direction}
      overflow="hidden"
      align={!isHorizontal ? 'start' : undefined}
      justify={isHorizontal ? 'start' : undefined}
      fitContent={fitContent}
      isHorizontal={isHorizontal}
      className={className}
      {...rest}
      ref={ref}
    >
      <StyledOverflowNav
        direction={direction}
        wrap={false}
        ref={containerRef}
        justify="start"
        tag={tag ?? 'ul'}
        role="menu"
        flex
      >
        {localItems.map((item) => renderItem(item))}
      </StyledOverflowNav>
      {sortedOverflowItems.length > 0 && (
        <Menu
          role="button"
          icon={<More />}
          items={sortedOverflowItems}
          size="medium"
          alignSelf="center"
          dropProps={{
            align: {
              [themeContext.dir === 'rtl' ? 'left' : 'right']:
                themeContext.dir === 'rtl' ? 'left' : 'right',
              top: 'bottom',
            },
          }}
        />
      )}
    </StyledOverflowNavContainer>
  );
});

export default OverflowNav;
