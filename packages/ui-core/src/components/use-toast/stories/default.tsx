import {
  Avatar,
  Box,
  Button,
  CheckBox,
  Heading,
  NameValueList,
  NameValuePair,
  Paragraph,
  RadioButtonGroup,
} from 'grommet';
import { Gremlin } from 'grommet-icons';
import { useRef, useState } from 'react';
import { useToast } from '..';
import { AddToastReturn, ToastPosition, ToastType } from '../use-toast';

export default {
  title: 'DataDisplay/Toast/Default',
};

const getToastId = (() => {
  let id = 0;
  return () => {
    return ++id;
  };
})();

const Default = () => {
  const { addToast } = useToast({});
  const toastRef = useRef<AddToastReturn>();

  const handleClick = () => {
    toastRef.current = addToast(
      {
        message: (
          <Box>
            <Box direction="row" align="center">
              <Avatar background="accent-3">
                <Gremlin />
              </Avatar>
              <Box margin={{ start: 'small' }}>
                <Heading level="4" margin={{ vertical: 'small' }}>
                  Toast Title
                </Heading>
              </Box>
            </Box>
            <Paragraph margin="0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </Paragraph>
          </Box>
        ),
        type,
        actions: [
          {
            content: 'Close',
            handler: (_, cancel) => {
              cancel();
            },
          },
        ],
        options: {
          position,
          pauseOnHover,
          showProgress,
          autoClose,
        },
      },
      getToastId().toString()
    );
  };

  const [position, setPosition] = useState<ToastPosition>('top-left');
  const [type, setType] = useState<ToastType>('info');
  const [showProgress, setShowProgress] = useState<boolean>(true);
  const [pauseOnHover, setPauseOnHover] = useState<boolean>(true);
  const [autoClose, setAutoClose] = useState<boolean>(true);

  return (
    <Box fill align="center" justify="center">
      <Box align="center" width="large" pad="smalls">
        <NameValueList pairProps={{ direction: 'column' }}>
          <NameValuePair name="Toast Position">
            <RadioButtonGroup
              name="position"
              wrap
              value={position}
              onChange={(e) => setPosition(e.target.value as ToastPosition)}
              pad="small"
              round="xsmall"
              margin={{ vertical: 'small' }}
              border={{ side: 'all', style: 'solid', color: 'brand' }}
              options={[
                {
                  value: 'top-left',
                  label: 'Top Left',
                },
                {
                  value: 'top-center',
                  label: 'Top Center',
                },
                {
                  value: 'top-right',
                  label: 'Top Right',
                },
                {
                  value: 'bottom-left',
                  label: 'Bottom Left',
                },
                {
                  value: 'bottom-center',
                  label: 'Bottom Center',
                },
                {
                  value: 'bottom-right',
                  label: 'Bottom Right',
                },
              ]}
            />
          </NameValuePair>
          <NameValuePair name="Toast Type">
            <RadioButtonGroup
              name="position"
              wrap
              value={type}
              onChange={(e) => setType(e.target.value as ToastType)}
              pad="small"
              round="xsmall"
              margin={{ vertical: 'small' }}
              border={{ side: 'all', style: 'solid', color: 'brand' }}
              options={[
                {
                  value: 'info',
                  label: 'Info',
                },
                {
                  value: 'success',
                  label: 'Success',
                },
                {
                  value: 'error',
                  label: 'Error',
                },
                {
                  value: 'warning',
                  label: 'warning',
                },
              ]}
            />
          </NameValuePair>
          <NameValuePair name="Show Progress">
            <CheckBox
              checked={showProgress}
              toggle
              onChange={(e) => setShowProgress(e.target.checked)}
            />
          </NameValuePair>
          <NameValuePair name="Pause On Hover">
            <CheckBox
              checked={pauseOnHover}
              toggle
              onChange={(e) => setPauseOnHover(e.target.checked)}
            />
          </NameValuePair>
          <NameValuePair name="Auto Close">
            <CheckBox
              checked={autoClose}
              toggle
              onChange={(e) => setAutoClose(e.target.checked)}
            />
          </NameValuePair>
        </NameValueList>
        <Button label="Show Toast" onClick={handleClick} />{' '}
        <Button label="Close Latest" onClick={toastRef.current?.close} />
      </Box>
    </Box>
  );
};

Default.args = {
  full: true,
};

export { Default };
