import { Box, Button } from 'grommet';
import { Close } from 'grommet-icons';
import { normalizeColor } from 'grommet/utils';
import { MouseEvent } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useToastOptions } from './options';
import { Toast, ToastAction, ToastPosition } from './use-toast';

export interface ToastItemProps {
  toast: Toast;
}

const showAnimationMap = {
  'top-right': {
    from: 'translateX(100%)',
    to: 'translateX(0%)',
  },
  'top-left': {
    from: 'translateX(-100%)',
    to: 'translateX(0%)',
  },
  'bottom-right': {
    from: 'translateX(100%)',
    to: 'translateX(0%)',
  },
  'bottom-left': {
    from: 'translateX(-100%)',
    to: 'translateX(0%)',
  },
  'top-center': {
    from: 'translateY(-100%)',
    to: 'translateY(0%)',
  },
  'bottom-center': {
    from: 'translateY(100%)',
    to: 'translateY(0%)',
  },
};

const hideAnimationMap = {
  'top-right': {
    from: 'translateX(0%)',
    to: 'translateX(100%)',
  },
  'top-left': {
    from: 'translateX(0%)',
    to: 'translateX(-100%)',
  },
  'bottom-right': {
    from: 'translateX(0%)',
    to: 'translateX(100%)',
  },
  'bottom-left': {
    from: 'translateX(0%)',
    to: 'translateX(-100%)',
  },
  'top-center': {
    from: 'translateY(0%)',
    to: 'translateY(-100%)',
  },
  'bottom-center': {
    from: 'translateY(0%)',
    to: 'translateY(100%)',
  },
};

const toastTypeMap = {
  info: 'status-unknown',
  success: 'status-ok',
  error: 'status-error',
  warning: 'status-warning',
};

const ShowAnimation = (position: ToastPosition) => keyframes`
   from {
      transform:${showAnimationMap[position].from};
      opacity:0;
   }

   to {
      transform:${showAnimationMap[position].to};
      opacity:1;
   }
`;

const HideAnimation = (position: ToastPosition) => keyframes`
   from {
      transform:${hideAnimationMap[position].from};
      opacity:1;
   }

   to {
      transform:${hideAnimationMap[position].to};
      opacity:0;
   }
`;

const ProgressAnimation = keyframes`
   from {
     width:100%;
   }

   to {
     width:0;
   }
`;

const ProgressBar = styled(Box)<{
  duration: number;
}>`
  height: 0.5em;
  width: 100%;
  bottom: 0;
  ${({ theme }) => (theme.dir === 'rtl' ? 'right:0' : 'left:0')};
  transform: translateY(100%);
  background: ${({ theme }) => normalizeColor('brand', theme)};
  animation: ${ProgressAnimation};
  animation-duration: ${({ duration }) => duration}ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  position: absolute;
  box-sizing: border-box;
`;

const StyledToastItem = styled(Box)<{
  visible: boolean;
  position: ToastPosition;
  animationDuration: number;
  pauseOnHover: boolean;
}>`
  animation: ${({ visible, position }) =>
    visible ? ShowAnimation(position) : HideAnimation(position)}};
  animation-duration : ${({ animationDuration }) => animationDuration}ms;  
  animation-timing-function:cubic-bezier(.53,.57,.57,1.25);
  position:relative;
  transition: top 0.3s linear;
  animation-fill-mode:forwards;
  animation-play-state:initial;
  position:relative;
  ${({ pauseOnHover }) =>
    pauseOnHover &&
    `&:hover ${ProgressBar}{
    animation-play-state:paused;
  }`}
`;

const ToastItem: React.FC<ToastItemProps> = (props) => {
  const { toast } = props;

  const toastOptions = useToastOptions(toast);

  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toastElement = toastRef.current;
    const handleMouseIn = () => {
      toast._timer?.pause();
    };

    const handleMouseOut = () => {
      toast._timer?.resume();
    };

    if (toastOptions.pauseOnHover && toastElement) {
      toastElement.addEventListener('mouseenter', handleMouseIn);
      toastElement.addEventListener('mouseleave', handleMouseOut);
    }

    return () => {
      if (toastOptions.pauseOnHover && toastElement) {
        toastElement.removeEventListener('mouseenter', handleMouseIn);
        toastElement.removeEventListener('mouseleave', handleMouseOut);
      }
    };
  }, [toast._timer, toastOptions.pauseOnHover]);

  const handleAction = useCallback(
    (handler) => (e: MouseEvent<unknown>) => {
      handler(e, toast.cancel);
    },
    [toast.cancel]
  );

  return (
    <StyledToastItem
      ref={toastRef}
      pad="small"
      round="xxsmall"
      margin={{ vertical: 'xsmall', horizontal: 'small' }}
      visible={toast.visible}
      background={toastTypeMap[toastOptions.type]}
      animationDuration={toastOptions.animationDuration}
      position={toastOptions.position}
      pauseOnHover={toastOptions.pauseOnHover}
      flex={false}
      data-id={toast.id}
      className="toast-item"
    >
      <Box direction="row" align="start">
        <Box flex>
          {toast.message}
          {toast.actions && (
            <Box pad="small" direction="row" align="center" justify="start">
              {toast.actions.map((action: ToastAction, i) => (
                <Button
                  key={i}
                  primary={action.primary}
                  onClick={handleAction(action.handler)}
                  label={typeof action.content === 'string' && action.content}
                  children={
                    typeof action.content !== 'string'
                      ? action.content
                      : undefined
                  }
                />
              ))}
            </Box>
          )}
        </Box>
        <Button
          margin={{ start: 'small' }}
          plain
          icon={<Close size="small" />}
          onClick={toast.cancel}
        />
      </Box>
      {toastOptions.autoClose && toastOptions.showProgress && (
        <ProgressBar duration={toastOptions.toastDuration} />
      )}
    </StyledToastItem>
  );
};
export { ToastItem };
