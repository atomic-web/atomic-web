import { Box, BoxProps, Collapsible, ThemeContext, Tip } from 'grommet';
import { FormDown } from 'grommet-icons';
import { ColorType, WidthType } from 'grommet/utils';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { createContext, useContext } from 'react';
import styled from 'styled-components';
import { ThemeType } from '../../shared/types/theme';
import {
  StyledSideNavBody,
  StyledSideNavFooter,
  StyledSideNavHeader,
  StyledSideNavItem,
  SideNavItemLabel,
  SideNavPopup,
} from '.';
import { MenuItemProps } from '../../shared/types/menu-item';
import { StyledSideNav } from './styled-side-nav';
import { WrapIf } from '../../shared/components/render-if';
import { useMemo } from 'react';

export interface SideNavProps extends BoxProps {
  items: SideNavItemProps[];
  plain?: boolean;
  mini?: boolean;
  header?:
    | React.ReactNode
    | ((context: SideNavContextValue) => React.ReactNode);
  footer?:
    | React.ReactNode
    | ((context: SideNavContextValue) => React.ReactNode);
  itemBackground?: ColorType | BackgroundSelectorFunc;
  itemHoverBackground?: ColorType;
  miniWidth?: WidthType;
  width?: WidthType;
  activeItem?: string;
}

type BackgroundSelectorFunc = (context: {
  active?: boolean;
  level: number;
  mini?: boolean;
}) => ColorType;

export interface SideNavItemProps extends MenuItemProps {
  expanded?: boolean;
  badge?: React.ReactNode;
  items?: SideNavItemProps[];
  active?: boolean;
}

interface InternalSideNavItemProps extends SideNavItemProps {
  className?: string;
  isSubItem?: boolean;
  level: number;
  showSubMenuIcon: boolean;
  showLabel: boolean;
  showBadge: boolean;
  path?: (string | undefined)[];
  items?: InternalSideNavItemProps[];
}

interface InternalSideNavItemViewProps extends InternalSideNavItemProps {
  hasSubItems: boolean;
  onToggle?: () => void;
  isExpanded?: boolean;
}

interface SideNavContextValue {
  plain?: boolean;
  mini?: boolean;
  activePath?: string[];
  itemBackground?: ColorType | BackgroundSelectorFunc;
  itemHoverBackground?: ColorType;
}

const ArrowBox = styled(Box)<{ expanded?: boolean }>`
  transition: transform 0.2s ease-in-out;
  transform: rotate(${(props) => (props.expanded ? '180deg' : '0deg')});
`;

const makeActivePath = (
  items: InternalSideNavItemProps[],
  activeItem: string
): string[] => {
  let nextItems: InternalSideNavItemProps[] | undefined = items;
  const activePath: string[] = [];

  const firstLevelActive = nextItems.find(
    (item) => item.id && activeItem && item.id === activeItem
  );

  if (firstLevelActive?.id) {
    return [firstLevelActive.id];
  }

  while (nextItems?.length) {
    nextItems = nextItems.reduce(
      (p: InternalSideNavItemProps[], c: InternalSideNavItemProps) => [
        ...p,
        ...(c.items ?? []).map((i) => {
          const cpath = c.path?.length ? [...c.path, c.id] : [c.id];
          if (i.id && activeItem && i.id === activeItem) {
            for (const id of cpath) {
              if (id) {
                activePath.push(id);
              }
            }

            activePath.push(i.id);
          }
          return {
            ...i,
            path: cpath,
          };
        }),
      ],
      []
    );
  }
  return activePath;
};

const SideNavContext = createContext<SideNavContextValue>({});

const SideNavItemView = forwardRef<
  HTMLDivElement,
  InternalSideNavItemViewProps
>((props, ref) => {
  const {
    level,
    badge,
    className,
    onToggle,
    active,
    icon,
    label,
    hasSubItems,
    showLabel,
    showBadge,
    showSubMenuIcon,
    isExpanded,
    onClick,
  } = props;
  const { plain, itemBackground, itemHoverBackground, mini } =
    useContext(SideNavContext);

  const context = {
    active,
    level,
    mini,
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onToggle) {
      onToggle();
    }

    if (onClick) {
      onClick(e);
    }
  };

  const classList = [className, 'side-nav-item'];

  if (mini) {
    classList.push('mini');
  }

  if (active) {
    classList.push('active');
  }

  return (
    <StyledSideNavItem
      level={level}
      plain={plain}
      mini={mini}
      direction="row"
      align="center"
      //justify={mini ? 'center' : undefined}
      focusIndicator={false}
      pad={plain ? undefined : { vertical: 'small', horizontal: 'small' }}
      onClick={handleClick}
      ref={ref}
      flex={false}
      background={
        typeof itemBackground === 'function'
          ? itemBackground(context)
          : itemBackground
      }
      //@ts-ignore
      kind={itemHoverBackground ? { hover: itemHoverBackground } : undefined}
      hoverBackground={itemHoverBackground}
      className={classList.join(' ')}
    >
      <Box margin={{ end: plain || !icon || mini ? '0' : 'small' }}>{icon}</Box>
      {showLabel && (
        <>
          <Box flex>
            <SideNavItemLabel style={{ width: 'fit-content' }}>
              {label}
            </SideNavItemLabel>
          </Box>
          {(Boolean(badge) || hasSubItems) && (
            <Box round="medium" direction="row" align="center">
              {showBadge && badge}
              {hasSubItems && showSubMenuIcon && (
                <ArrowBox expanded={isExpanded}>{<FormDown />}</ArrowBox>
              )}
            </Box>
          )}
        </>
      )}
    </StyledSideNavItem>
  );
});

const SideNavItem: React.FC<InternalSideNavItemProps> = (props) => {
  const { expanded, items, level, showBadge, showLabel, showSubMenuIcon, id } =
    props;
  const { mini, itemBackground, itemHoverBackground, activePath } =
    useContext(SideNavContext);
  const [isExpanded, setExpanded] = useState(expanded);
  const [isHover, updateIsHover] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const [itemElement, setItemElement] = useState<HTMLDivElement | null>(null);
  const { dir } = useContext<ThemeType>(ThemeContext);

  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);

  const handleToggle = () => {
    setExpanded((e) => !e);
  };

  const toggleTimer = useRef<number>();

  const togglePopup = useCallback((show) => {
    if (toggleTimer.current) {
      clearTimeout(toggleTimer.current);
    }
    toggleTimer.current = setTimeout(() => {
      updateIsHover(show);
    }, 0) as unknown as number;
  }, []);

  useEffect(() => {
    const elm = itemRef.current;

    const handleMouseEnter = () => {
      togglePopup(true);
    };

    const handleMouseLeave = () => {
      togglePopup(false);
    };

    if (elm) {
      setItemElement(elm);
      elm.addEventListener('mouseenter', handleMouseEnter);
      elm.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (elm) {
        elm.removeEventListener('mouseenter', handleMouseEnter);
        elm.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [itemRef, togglePopup]);

  const hasSubItems = items && Boolean(items?.length);

  const handleSubMenuRefChange = (elm: HTMLDivElement) => {
    if (elm) {
      const handleMouseEnter = () => {
        togglePopup(true);
      };

      const handleMouseLeave = () => {
        togglePopup(false);
      };

      elm.addEventListener('mouseenter', handleMouseEnter);
      elm.addEventListener('mouseleave', handleMouseLeave);
    }
  };

  const isActive = id ? activePath?.includes(id) : false;

  return (
    <>
      <WrapIf
        condition={Boolean(mini && level === 1 && !hasSubItems)}
        wrap={(children) => (
          <Tip
            content={
              <Box
                margin="small"
                pad="small"
                background="light-2"
                round="xxsmall"
                elevation="small"
              >
                {props.label}
              </Box>
            }
            plain
            dropProps={{
              align: dir === 'rtl' ? { right: 'left' } : { left: 'right' },
            }}
          >
            {children}
          </Tip>
        )}
      >
        <Box flex={{ shrink: 0, grow: 0 }}>
          <SideNavItemView
            {...props}
            active={isActive}
            hasSubItems={Boolean(hasSubItems)}
            isExpanded={isExpanded}
            onToggle={handleToggle}
            showBadge={showBadge}
            showLabel={showLabel}
            showSubMenuIcon={showSubMenuIcon}
            ref={itemRef}
          />
        </Box>
      </WrapIf>
      {hasSubItems && (
        <>
          {mini && isHover && itemElement && (
            <SideNavPopup
              target={itemElement}
              stretch
              align={
                dir === 'rtl'
                  ? { right: 'left', top: 'top' }
                  : { left: 'right', top: 'top' }
              }
            >
              <SideNav
                items={items}
                //@ts-ignore
                level={level}
                ref={handleSubMenuRefChange}
                itemBackground={itemBackground}
                itemHoverBackground={itemHoverBackground}
              />
            </SideNavPopup>
          )}
          {!mini && (
            <Box
              className="sub-items"
              flex={{ grow: 0, shrink: isExpanded ? 0 : undefined }}
            >
              <Collapsible open={isExpanded}>
                {items.map((item, index) => (
                  <SideNavItem
                    {...item}
                    //@ts-ignore
                    level={level + 1}
                    isSubItem={true}
                    key={index}
                    showBadge={true}
                    showLabel={true}
                    showSubMenuIcon={true}
                  />
                ))}
              </Collapsible>
            </Box>
          )}
        </>
      )}
    </>
  );
};

const SideNav = forwardRef<HTMLDivElement, SideNavProps>((props, ref) => {
  const {
    items,
    plain,
    header,
    footer,
    mini,
    itemBackground,
    itemHoverBackground,
    activeItem,
    miniWidth,
    width,
    ...rest
  } = props;

  const activePath = useMemo(
    () =>
      !activeItem
        ? []
        : makeActivePath(items as InternalSideNavItemProps[], activeItem),
    [activeItem, items]
  );

  const contextValue = {
    itemBackground,
    itemHoverBackground,
    activePath,
    mini,
    plain,
  };

  return (
    <StyledSideNav
      {...rest}
      width={mini ? miniWidth ?? 'fit-content' : width}
      className="side-nav"
      ref={ref}
    >
      <SideNavContext.Provider value={contextValue}>
        {header && (
          <StyledSideNavHeader pad={!plain ? 'medium' : undefined}>
            {typeof header === 'function' ? header(contextValue) : header}
          </StyledSideNavHeader>
        )}
        <StyledSideNavBody>
          {items.map((item, index) => (
            <SideNavItem
              {...(item as InternalSideNavItemProps)}
              //@ts-ignore
              level={props.level ?? 1}
              key={index}
              showBadge={!mini}
              showLabel={!mini}
              showSubMenuIcon={!mini}
            />
          ))}
        </StyledSideNavBody>
        {footer && (
          <StyledSideNavFooter>
            {typeof footer === 'function' ? footer(contextValue) : footer}
          </StyledSideNavFooter>
        )}
      </SideNavContext.Provider>
    </StyledSideNav>
  );
});

export { SideNav };
