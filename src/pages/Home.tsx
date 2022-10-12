import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css, keyframes } from 'styled-components';
import { useMountEffect } from '../hooks';
import { isDarkMode } from '../store';

interface BoxPropsType {
  width: number;
  height: number;
  darkModeState: boolean;
  image: string;
  $transition: boolean;
}

const Home = (): JSX.Element => {
  const darkModeState = useRecoilValue(isDarkMode);
  const [image, setImage] = useState<string>('');
  const [transition, setTransition] = useState<boolean>(false);

  const getBackgroundImage = async (): Promise<void> => {
    try {
      const { innerWidth, innerHeight } = window;
      const picsum = await fetch(`https://picsum.photos/${innerWidth}/${innerHeight}?blur`);
      setImage(picsum.url);
      setTransition(true);
      setTimeout(() => setTransition(false), 300);
    } catch (e) {
      console.log(e);
    }
  };

  useMountEffect(() => {
    getBackgroundImage();
    window.addEventListener('resize', getBackgroundImage);

    return () => window.removeEventListener('resize', getBackgroundImage);
  });

  return (
    <Box
      width={window.innerWidth}
      height={window.innerHeight}
      darkModeState={darkModeState}
      image={image}
      $transition={transition}
    >
      <StartMargin />
      <StartUp darkModeState={darkModeState}>Search anything to get started!</StartUp>
      <AttributesFooter>
        <Attribute href="https://www.flaticon.com/free-icons/moon" title="moon icons">
          Moon icons created by Good Ware - Flaticon
        </Attribute>
        <Attribute href="https://www.flaticon.com/free-icons/search" title="search icons">
          Search icons created by Smashicons - Flaticon
        </Attribute>
        <Attribute href="https://picsum.photos" title="Lorem Picsum">
          Background images used by Lorem Picsum
        </Attribute>
      </AttributesFooter>
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
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: unset;

  ${(props) =>
    props.image &&
    css`
      background: url(${props.image}) no-repeat;
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
    margin: 0 20px;
  }
`;

const StartMargin = styled.div`
  height: 16px;
`;

const StartUp = styled.h1<{ darkModeState: boolean }>`
  position: relative;
  z-index: 1;
  font-size: 1.8rem;
  text-align: center;
  -webkit-text-stroke: 0.6px ${(props) => (props.darkModeState ? `#000` : `#fff`)};
  transition: -webkit-text-stroke 300ms;
`;

const AttributesFooter = styled.footer`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  & > *:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const Attribute = styled.a`
  font-size: 0.8rem;
  font-weight: lighter;
  color: #808080;
  text-decoration: none;
`;
