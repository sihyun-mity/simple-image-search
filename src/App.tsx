import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { DisplayModeControl } from './components';
import { useMountEffect } from './hooks';
import { displayMode } from './store';
import DisplayModeType from './types/DisplayModeType';

const App = () => {
  const [displayTheme, setDisplayTheme] = useRecoilState(displayMode);

  const initializeDisplayTheme = () => {
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initTheme: DisplayModeType = isBrowserDarkMode ? 'dark' : 'light';
    const localSettingTheme = window.localStorage.getItem('theme') as DisplayModeType;

    localSettingTheme && (initTheme = localSettingTheme);

    setDisplayTheme(initTheme);
  };

  useMountEffect(() => initializeDisplayTheme());

  return (
    <Layout browserMode={displayTheme}>
      <span>Test</span>
      <DisplayModeControl />
    </Layout>
  );
};

export default App;

const Layout = styled.div<{ browserMode: DisplayModeType }>`
  width: 100vw;
  height: 100vh;
  ${(props) => props.theme[props.browserMode].colors.body};
`;
