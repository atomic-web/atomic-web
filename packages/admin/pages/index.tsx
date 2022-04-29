import useTranslation from 'next-translate/useTranslation';
import { Layout } from '../components/layout';

export function Index() {
  const { t } = useTranslation('theme');

  return <Layout>{t('app-msg-welcome')}</Layout>;
}

export default Index;
