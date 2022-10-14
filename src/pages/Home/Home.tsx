import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled, { css, keyframes } from 'styled-components';
import { Input } from '../../components';
import { displayMode, isDarkMode, isMobile } from '../../store';
import DisplayModeType from '../../types/DisplayModeType';
import { Attribution } from './components';

interface BoxPropsType {
  width: number;
  height: number;
  darkModeState: boolean;
  image: string | undefined;
  $transition: boolean;
}

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const displayTheme = useRecoilValue(displayMode);
  const darkModeState = useRecoilValue(isDarkMode);
  const mobileDevice = useRecoilValue(isMobile);
  const [transition, setTransition] = useState<boolean>(false);

  const getBackgroundImage = async (): Promise<string> => {
    const { innerWidth, innerHeight } = window;
    const size: number = innerWidth > innerHeight ? innerWidth : innerHeight;
    const { url } = await fetch(`https://picsum.photos/${size}?blur`);
    return url;
  };

  const loadBackgroundImage = () => {
    setTransition(true);
    setTimeout(() => setTransition(false), 300);
  };

  const { data: image } = useQuery(`background`, getBackgroundImage, { staleTime: Infinity, suspense: true });

  useEffect(() => loadBackgroundImage(), [image]);

  return (
    <Box
      width={window.innerWidth}
      height={window.innerHeight}
      darkModeState={darkModeState}
      image={image}
      $transition={transition}
    >
      <Input id="home_searchBar" width={mobileDevice ? `90%` : `40%`} />
      <StartUp displayTheme={displayTheme}>{t('start_guide')}</StartUp>
      <Attribution />
    </Box>
  );
};

export default Home;

const fadeIn = (darkModeState: boolean) => keyframes`
  from {
    background-color: ${darkModeState ? `rgba(18, 18, 18, 1)` : `rgba(255, 255, 255, 1)`};
  }

  to {
    background-color: ${darkModeState ? `rgba(18, 18, 18, 0.4)` : `rgba(255, 255, 255, 0)`};
  }
`;

const Box = styled.article<BoxPropsType>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: unset;
  padding: 0 20px;
  overflow-y: hidden;

  ${(props) =>
    props.image &&
    css`
      background: url(${props.image}) center no-repeat;
    `}

  &::after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';

    ${(props) =>
      props.$transition &&
      css`
        animation: ${fadeIn(props.darkModeState)} 200ms;
      `}

    ${(props) =>
      props.darkModeState &&
      css`
        background-color: rgba(18, 18, 18, 0.4);
      `}

    transition: background-color 200ms;
  }

  & > * {
    z-index: 1;
  }
`;

const StartUp = styled.h1<{ displayTheme: DisplayModeType }>`
  position: relative;
  margin-bottom: 0;
  font-size: 1.8rem;
  text-align: center;

  ${(props) => props.theme[props.displayTheme].colors.heading};
`;
