import { Box } from 'grommet';
import { useEffect } from 'react';
import { render } from '../../test-utils';
import { ToastType, useToast } from './use-toast';
import '@testing-library/jest-dom';

describe('Toast', () => {
  it('actions callback is called', async () => {
    const onClose = jest.fn((_, close) => close());

    const Component = () => {
      const { addToast } = useToast();

      useEffect(() => {
        addToast({
          type: 'info',
          message: 'Test',
          actions: [
            {
              content: 'Close Toast',
              handler: onClose,
            },
          ],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return <Box></Box>;
    };

    const { findByText } = render(<Component />);

    const closeToastButton = await findByText('Close Toast', {});
    closeToastButton.click();

    expect(onClose).toHaveBeenCalled();
  });

  it('type renders correct color', () => {
    const Component = (props: { type: ToastType }) => {
      const { addToast } = useToast();

      useEffect(() => {
        addToast({
          type: props.type,
          message: 'Test',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return <Box></Box>;
    };

    const { container: c1 } = render(<Component type="info" />);
    expect(c1.getElementsByClassName('toast-item')[0]).toHaveStyle({
      'background-color': '#CCCCCC',
    });

    const { container: c2 } = render(<Component type="success" />);
    expect(c2.getElementsByClassName('toast-item')[0]).toHaveStyle({
      'background-color': '#00C781',
    });

    const { container: c3 } = render(<Component type="error" />);
    expect(c3.getElementsByClassName('toast-item')[0]).toHaveStyle({
      'background-color': '#FF4040',
    });

    const { container: c4 } = render(<Component type="warning" />);
    expect(c4.getElementsByClassName('toast-item')[0]).toHaveStyle({
      'background-color': '#FFAA15',
    });

  });
});
