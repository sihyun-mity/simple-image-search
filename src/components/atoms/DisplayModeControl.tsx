import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { displayMode, isDarkMode, isMobile } from '../../store';
import sun from '../../assets/images/sun.png';
import moon from '../../assets/images/moon.png';
import ToggleSwitch from './ToggleSwitch';
import DisplayModeType from '../../types/DisplayModeType';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useMountEffect } from '../../hooks';
import { useTranslation } from 'react-i18next';

const DisplayModeControl = (): JSX.Element => {
  const [displayTheme, setDisplayTheme] = useRecoilState(displayMode);
  const darkModeState = useRecoilValue(isDarkMode);
  const mobileDevice = useRecoilValue(isMobile);
  const [useSystemTheme, setUseSystemTheme] = useState<boolean>(true);
  const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { t } = useTranslation();

  const manuallyHandleDisplayMode = (): void => {
    const reverseMode = displayTheme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', reverseMode);
    setDisplayTheme(reverseMode);
    setUseSystemTheme(false);
  };

  const autoHandleDisplayMode = useCallback((): void => {
    setDisplayTheme(darkModePreference.matches ? `dark` : `light`);
    window.localStorage.setItem('theme', darkModePreference.matches ? `dark` : `light`);
  }, [darkModePreference.matches, setDisplayTheme]);

  const syncSystemTheme = (value: boolean): void => {
    window.localStorage.setItem('useSystemTheme', value.toString());

    if (value) {
      setUseSystemTheme(true);
      setDisplayTheme(darkModePreference.matches ? `dark` : `light`);
    }
  };

  useLayoutEffect(() => {
    useSystemTheme
      ? darkModePreference.addEventListener('change', autoHandleDisplayMode)
      : darkModePreference.removeEventListener('change', autoHandleDisplayMode);

    return () => darkModePreference.removeEventListener('change', autoHandleDisplayMode);
  }, [useSystemTheme, autoHandleDisplayMode, darkModePreference]);

  useMountEffect(() => window.localStorage.getItem('useSystemTheme') !== 'true' && setUseSystemTheme(false));

  return (
    <Box onMouseOver={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)}>
      <ToggleButton>
        <input type="checkbox" checked={darkModeState} onChange={() => manuallyHandleDisplayMode()} hidden />
        <DarkMode src={darkModeState ? moon : sun} darkModeState={darkModeState} />
      </ToggleButton>
      {showOptions && (
        <OptionPanel mobileDevice={mobileDevice}>
          <EmptySpace />
          <Options displayTheme={displayTheme}>
            <Item>
              <ItemText>{t('darkmode_option')}</ItemText>
              <ToggleSwitch size={'small'} value={useSystemTheme} func={(value: boolean) => syncSystemTheme(value)} />
            </Item>
          </Options>
        </OptionPanel>
      )}
    </Box>
  );
};

export default DisplayModeControl;

const Box = styled.div`
  position: relative;
  user-select: none;

  * {
    -webkit-user-drag: none;
  }
`;

const ToggleButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DarkMode = styled.img<{ darkModeState: boolean }>`
  max-width: 20px;
  max-height: 20px;
  padding: 4px;
  cursor: pointer;

  ${(props) =>
    props.darkModeState &&
    css`
      filter: invert(100%) sepia(5%) saturate(5849%) hue-rotate(166deg) brightness(105%) contrast(104%);
    `}
`;

const OptionPanel = styled.div<{ mobileDevice: boolean }>`
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100%);

  ${(props) =>
    props.mobileDevice
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`;

const EmptySpace = styled.div`
  width: 100%;
  height: 8px;
  opacity: 0;
`;

const Options = styled.div<{ displayTheme: DisplayModeType }>`
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 4px;

  ${(props) => props.displayTheme && props.theme[props.displayTheme].colors.options};
`;

const Item = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 6px 8px;
`;

const ItemText = styled.label`
  margin-right: 6px;
  cursor: inherit;
`;
