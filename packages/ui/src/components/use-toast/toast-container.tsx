import { Box } from 'grommet';
import { useContext } from 'react';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { ToastContext } from '../../utils/ui-context';
import { ToastItem } from './toast-item';
import { useToastOptions } from './options';
import { DirectionType } from 'grommet/utils';
import { createElement } from 'react';
import React from 'react';

const StyledToastContainer = styled(Box)<{ position: string }>`
  position: fixed;
  z-index:99;
  ${({ position }) => ContainerCoordinates(position)}
  ${({ position }) => ['top-left', 'top-center' , 'top-right'].includes(position) ? 'top:0;' : 'bottom:0'}
`;
const ContainerCoordinates = (position: string) => css`
  ${['top-right', 'bottom-right'].includes(position) && 'right:0;'}
  ${['top-left', 'bottom-left'].includes(position) && 'left:0;'}
  ${['top-center', 'bottom-center'].includes(position) &&
  'left:50%;transform:translateX(-50%);'}
`;

const directionMap: Record<string, DirectionType> = {
  'top-right': 'column',
  'top-left': 'column',
  'top-center': 'column',
  'bottom-right': 'column-reverse',
  'bottom-left': 'column-reverse',
  'bottom-center': 'column-reverse',
};

const ToastContainer: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { toasts } = useContext(ToastContext);

  const toastOptions = useToastOptions();

  const portals = useMemo(() => {
    const uniquePositions = new Set(
      toasts.map((toast) => toast.options?.position ?? toastOptions.position)
    );

    return Array.from(uniquePositions).map((position) => {
      const dirToasts = toasts.filter(
        (t) => (t.options?.position ?? toastOptions.position) === position
      );
      const direction = directionMap[position];

      const toastElements = dirToasts.map((toast) => {
        return (
          <ToastItem toast={toast} key={toast.id} />
        );
      });

      const container = createElement(
        StyledToastContainer,
        {
          key:`position-${position}`,
          position,
          direction,
        },
        toastElements
      );

      return container;
    });
  }, [toastOptions, toasts]);

  return <React.Fragment> {portals}</React.Fragment>;
};

export { ToastContainer };
