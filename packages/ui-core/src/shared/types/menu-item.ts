export interface MenuItemProps {
  id?: string;
  label: string | React.ReactElement | React.ComponentType;
  icon?: string | React.ReactElement | React.ComponentType;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
