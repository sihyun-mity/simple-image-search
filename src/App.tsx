import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Container } from './components';
import { useMountEffect } from './hooks';
import { Home } from './pages';
import { displayMode, viewHeight } from './store';
import DisplayModeType from './types/DisplayModeType';

const App = (): JSX.Element => {
  const setDisplayTheme = useSetRecoilState(displayMode);
  const setVh = useSetRecoilState(viewHeight);

  const initializeDisplayTheme = (): void => {
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initTheme: DisplayModeType = isBrowserDarkMode ? 'dark' : 'light';
    const localSettingTheme = window.localStorage.getItem('theme') as DisplayModeType;

    localSettingTheme && (initTheme = localSettingTheme);

    setDisplayTheme(initTheme);
  };

  const handleResize = (): void => setVh(window.innerHeight * 0.01);

  useMountEffect(() => {
    initializeDisplayTheme();
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
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
