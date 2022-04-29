import { Box, Heading } from 'grommet';
import { Grommet as GrommetIcon } from 'grommet-icons';
import useTranslation from 'next-translate/useTranslation';

const Branding: React.FC<unknown> = () => {
  const { t } = useTranslation('theme');

  return (
    <Box direction="row" align="center">
      <GrommetIcon size="large" />
      <Heading margin={{ start: 'small', vertical: 'xsmall' }} level="3">
        {t('app-title')}{' '}
      </Heading>
    </Box>
  );
};

export { Branding };
