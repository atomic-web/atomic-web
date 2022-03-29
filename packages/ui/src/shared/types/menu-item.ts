export interface MenuItemProps {
  label: string | React.ReactElement | React.ComponentType;
  icon?: string | React.ReactElement | React.ComponentType;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
