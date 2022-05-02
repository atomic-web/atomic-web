import { Box, Heading } from 'grommet';
import { Grommet as GrommetIcon } from 'grommet-icons';
import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';

const StyledHeading = styled(Heading)`
  white-space: nowrap;
`;

const Branding: React.FC<unknown> = () => {
  const { t } = useTranslation('theme');

  return (
    <Box direction="row" align="center">
      <GrommetIcon size="large" />
      <StyledHeading margin={{ start: 'small', vertical: 'xsmall' }} level="3">
        {t('app-title')}{' '}
      </StyledHeading>
    </Box>
  );
};

export { Branding };
