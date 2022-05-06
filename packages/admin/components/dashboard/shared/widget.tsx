import {
  Box,
  BoxProps,
  Card as GrommetCard,
  CardBody,
  CardHeader,
  Menu,
} from 'grommet';
import { MoreVertical } from 'grommet-icons';
import { WidthType } from 'grommet/utils';

export interface WidgetAction {
  name: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: (item: WidgetAction) => void;
}

export interface WidgetActionsProps {
  width?: WidthType;
  overflowAction?: 'showInMenu';
}

export type WidgetHeaderType =
  | string
  | {
      content: React.ReactNode;
      actions?: WidgetAction[];
      onAction? : (action:WidgetAction)=>void,
      actionProps?: WidgetActionsProps;
    };

export type WidgetFooterType =
  | string
  | {
      content: React.ReactNode;
      actions?: WidgetAction[];
      actionProps?: WidgetActionsProps;
    };

export interface WidgetProps extends BoxProps {
  header?: WidgetHeaderType;
  footer?: WidgetFooterType;
  children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = (props) => {
  const { children, header: headerProp, footer: footerProp, ...rest } = props;

  const header =
    typeof headerProp === 'string' ? headerProp : headerProp.content;

  const headerActions =
    typeof headerProp !== 'string'
      ? headerProp?.actions?.map((item) => ({
          active: item.active,
          label: <Box margin={{ start: 'small' }}>{item.label}</Box>,
          icon: item.icon,
          _id: item.name,
          onClick: () => {
             item.onClick?.(item);
             headerProp.onAction?.(item);
          },
        }))
      : undefined;

  const headerActionsProps =
    typeof headerProp !== 'string' ? headerProp.actionProps : undefined;

  return (
    <GrommetCard pad="small" {...rest}>
      {header && (
        <CardHeader margin={{bottom : 'medium'}}>
          <Box>{header}</Box>
          {headerActions && (
            <Box width={headerActionsProps?.width}>
              <Menu icon={<MoreVertical />} items={headerActions} />
            </Box>
          )}
        </CardHeader>
      )}
      {children && <CardBody>{children}</CardBody>}
      {/* {footer && <CardHeader>{footer}</CardHeader>} */}
    </GrommetCard>
  );
};

export { Widget };
