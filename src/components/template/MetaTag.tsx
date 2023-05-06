import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import { isDarkMode } from '@/store';

const MetaTag = () => {
  const darkModeState = useRecoilValue(isDarkMode);

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="theme-color" content={darkModeState ? '#454545' : '#fff'} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaTag;
