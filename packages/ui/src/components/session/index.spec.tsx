import { act, waitFor } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { render } from '../../test-utils';
import { Session } from './index';
import { SessionInfo, SessionProvider } from './session-context';
import '@testing-library/jest-dom';

describe('session', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders proper content', async () => {
    const tmpUserId = 'userId';
    const fallbackContent = 'Loading...';
    const sessionContent = (info: SessionInfo) => `UserId: ${info.userId}`;
    const fetchTime = 2000;
    const SessionWrapper = ({ children }: PropsWithChildren<unknown>) => {
      return (
        <SessionProvider
          fetchSession={() => {
            return new Promise((res) => {
              setTimeout(() => {
                res({ userId: tmpUserId });
              }, fetchTime);
            });
          }}
        >
          {children}
        </SessionProvider>
      );
    };

    const SessionComponent = () => (
      <Session fallback={fallbackContent}>
        {(info: SessionInfo) => sessionContent(info)}
      </Session>
    );

    const { getByText } = render(<SessionComponent />, {
      wrapper: ({ children }) => <SessionWrapper children={children} />,
    });

    expect(getByText(fallbackContent)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(fetchTime);
    });

    await waitFor(() => {
      expect(
        getByText(sessionContent({ userId: tmpUserId }))
      ).toBeInTheDocument();
    });
  });
});
