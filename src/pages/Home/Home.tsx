import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled, { css, keyframes } from 'styled-components';
import { isDarkMode } from '../../store';
import { Attribution } from './components';

interface BoxPropsType {
  width: number;
  height: number;
  darkModeState: boolean;
  image: string | undefined;
  $transition: boolean;
}

const Home = (): JSX.Element => {
  const darkModeState = useRecoilValue(isDarkMode);
  const [transition, setTransition] = useState<boolean>(false);

  const getBackgroundImage = async () => {
    const { innerWidth, innerHeight } = window;
    const size: number = innerWidth > innerHeight ? innerWidth : innerHeight;
    const { url } = await fetch(`https://picsum.photos/${size}?blur`);
    return url;
  };

  const loadBackgroundImage = () => {
    setTransition(true);
    setTimeout(() => setTransition(false), 300);
  };

  const { data: image } = useQuery(`background`, getBackgroundImage, { suspense: true });

  useEffect(() => loadBackgroundImage(), [image]);

  return (
    <Box
      width={window.innerWidth}
      height={window.innerHeight}
      darkModeState={darkModeState}
      image={image}
      $transition={transition}
    >
      <StartUp darkModeState={darkModeState}>Search anything to get started!</StartUp>
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
        animation: ${fadeIn(props.darkModeState)} 300ms;
      `}

    ${(props) =>
      props.darkModeState &&
      css`
        background-color: rgba(18, 18, 18, 0.4);
      `}

    transition: background-color 300ms;
  }

  & > * {
    z-index: 1;
  }
`;

const StartUp = styled.h1<{ darkModeState: boolean }>`
  position: relative;
  font-size: 1.8rem;
  text-align: center;
  -webkit-text-stroke: 0.6px ${(props) => (props.darkModeState ? `#000` : `#fff`)};
  transition: -webkit-text-stroke 300ms;
`;