import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Container } from './components';
import { useMountEffect } from './hooks';
import { Home } from './pages';
import { displayMode } from './store';
import DisplayModeType from './types/DisplayModeType';

const App = (): JSX.Element => {
  const setDisplayTheme = useSetRecoilState(displayMode);

  const initializeDisplayTheme = () => {
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initTheme: DisplayModeType = isBrowserDarkMode ? 'dark' : 'light';
    const localSettingTheme = window.localStorage.getItem('theme') as DisplayModeType;

    localSettingTheme && (initTheme = localSettingTheme);

    setDisplayTheme(initTheme);
  };

  useMountEffect(() => initializeDisplayTheme());

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="*">
            <Route path="" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
