import { Avatar, Box, Button, Heading, Paragraph } from 'grommet';
import { Gremlin } from 'grommet-icons';
import { useToast } from '..';

export default {
  title: 'DataDisplay/Toast/Default',
};

export const Default = () => {
  const { addToast } = useToast({});

  const handleClick = () => {
    addToast({
      message: (
        <Box>
          <Box direction="row" align="center">
            <Avatar background="accent-3">
              <Gremlin />
            </Avatar>
            <Box margin={{ start: 'small' }}>
              <Heading level="4" margin={{vertical:"small"}}>
                Hello
              </Heading>
            </Box>
          </Box>
          <Paragraph margin="0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </Paragraph>
        </Box>
      ),
      type: 'success',
      actions : [
        {
          content : "Close",
          handler : (_,cancel)=>{
            cancel();
          }
        }
      ],
      options:{
        position : "top-center"
      }
    });
  };

  return (
    <Box>
      <Button label="Show Toast" onClick={handleClick} />
    </Box>
  );
};
