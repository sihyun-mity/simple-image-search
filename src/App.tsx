import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Container } from './components';
import { useMountEffect } from './hooks';
import { Home } from './pages';
import { displayMode, responsiveType, viewHeight } from './store';
import DisplayModeType from './types/DisplayModeType';
import { optimizeEvent } from './utils';

const App = (): JSX.Element => {
  const setDisplayTheme = useSetRecoilState(displayMode);
  const setVh = useSetRecoilState(viewHeight);
  const setResponsiveType = useSetRecoilState(responsiveType);

  const initializeDisplayTheme = (): void => {
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initTheme: DisplayModeType = isBrowserDarkMode ? 'dark' : 'light';

    if (window.localStorage.getItem('useSystemTheme') !== 'true') {
      const localSettingTheme = window.localStorage.getItem('theme') as DisplayModeType;
      localSettingTheme && (initTheme = localSettingTheme);
    }

    setDisplayTheme(initTheme);
  };

  const calculateViewHeight = (): void => setVh(window.innerHeight * 0.01);

  const detectResponsiveType = (): void => {
    const width = window.innerWidth;

    if (width < 768) {
      setResponsiveType('mobile');
    } else if (width < 1024) {
      setResponsiveType('tablet');
    } else setResponsiveType('pc');
  };

  useMountEffect(() => {
    initializeDisplayTheme();
    calculateViewHeight();
    detectResponsiveType();
    window.addEventListener('resize', optimizeEvent(calculateViewHeight));
    window.addEventListener('resize', optimizeEvent(detectResponsiveType));

    return () => {
      window.removeEventListener('resize', optimizeEvent(calculateViewHeight));
      window.removeEventListener('resize', optimizeEvent(detectResponsiveType));
    };
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="simple-image-search/*" element={<Container />}>
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
