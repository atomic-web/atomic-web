import { Box, BoxProps, Collapsible, Text, ThemeContext } from 'grommet';
import { FormDown } from 'grommet-icons';
import { ColorType, WidthType } from 'grommet/utils';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { createContext, useContext } from 'react';
import styled from 'styled-components';
import { ThemeType } from '../../shared/types/theme';
import {
  StyledSideNavBody,
  StyledSideNavFooter,
  StyledSideNavHeader,
  StyledSideNavItem,
  SideNavPopup,
} from '.';
import { MenuItemProps } from '../../shared/types/menu-item';
import { StyledSideNav } from './styled-side-nav';

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
}

type BackgroundSelectorFunc = (context: { active?: boolean }) => ColorType;

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
}

interface InternalSideNavItemViewProps extends InternalSideNavItemProps {
  hasSubItems: boolean;
  onToggle?: () => void;
  isExpanded?: boolean;
}

interface SideNavContextValue {
  plain?: boolean;
  mini?: boolean;
  itemBackground?: ColorType | BackgroundSelectorFunc;
  itemHoverBackground?: ColorType;
}

const ArrowBox = styled(Box)<{ expanded?: boolean }>`
  transition: transform 0.2s ease-in-out;
  transform: rotate(${(props) => (props.expanded ? '180deg' : '0deg')});
`;

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
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onToggle) {
      onToggle();
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <StyledSideNavItem
      level={level}
      plain={plain}
      mini={mini}
      direction="row"
      align="center"
      justify={mini ? 'center' : undefined}
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
      className={`menu-item ${className}`}
    >
      <Box margin={{ end: plain || !icon || mini ? '0' : 'small' }}>
        {icon}
      </Box>
      {showLabel && (
        <>
          <Box flex>
            <Text style={{ width: 'fit-content' }}>{label}</Text>
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
  const { expanded, items, level, showBadge, showLabel, showSubMenuIcon } =
    props;
  const { mini, itemBackground, itemHoverBackground } =
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

  return (
    <>
      <SideNavItemView
        {...props}
        hasSubItems={Boolean(hasSubItems)}
        isExpanded={isExpanded}
        onToggle={handleToggle}
        showBadge={showBadge}
        showLabel={showLabel}
        showSubMenuIcon={showSubMenuIcon}
        ref={itemRef}
      />
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
                ref={handleSubMenuRefChange}
                itemBackground={itemBackground}
                itemHoverBackground={itemHoverBackground}
              />
            </SideNavPopup>
          )}
          {!mini && (
            <Box
              //@ts-ignore
              flex={{ grow: 0, shrink: isExpanded ? 0 : 'initial' }}
            >
              <Collapsible open={isExpanded}>
                {items.map((item, index) => (
                  <SideNavItem
                    level={level + 1}
                    {...item}
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
    miniWidth,
    width,
    ...rest
  } = props;

  const contextValue = {
    itemBackground,
    itemHoverBackground,
    mini,
    plain,
  };

  return (
    <StyledSideNav
      {...rest}
      width={mini ? miniWidth ?? 'fit-content' : width}
      mini={mini}
      miniWidth={miniWidth}
      normalWidth={width}
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
              {...item}
              level={1}
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
