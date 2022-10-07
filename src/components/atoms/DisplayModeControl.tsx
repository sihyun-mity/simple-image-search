import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { displayMode } from '../../store';

interface StyledProps {
  isDarkMode: boolean;
}

const DisplayModeControl = (): JSX.Element => {
  const [displayTheme, setDisplayTheme] = useRecoilState(displayMode);
  const isDarkMode: boolean = useMemo(() => (displayTheme === 'dark' ? true : false), [displayTheme]);

  const reverseDisplayMode = () => {
    const reverseMode = displayTheme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', reverseMode);
    setDisplayTheme(reverseMode);
  };

  return (
    <Box isDarkMode={isDarkMode}>
      <input type="checkbox" checked={isDarkMode} onChange={() => reverseDisplayMode()} hidden />
      <Background isDarkMode={isDarkMode}></Background>
      <Rectangle isDarkMode={isDarkMode} />
    </Box>
  );
};

export default DisplayModeControl;

const Box = styled.label<StyledProps>`
  display: flex;
  align-items: center;
  position: relative;
  min-width: 44px;
  min-height: 22px;
  max-width: max-content;
  padding: 2px;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: ${(props) => (props.isDarkMode ? 'blue' : 'lightgrey')};
  cursor: pointer;
  user-select: none;

  &:active:hover {
    & > div:last-of-type {
      width: calc(24px);

      ${(props) =>
        props.isDarkMode &&
        css`
          left: calc(100% - 26px);
        `}
    }
  }

  * {
    -webkit-user-drag: none;
  }
`;

const Background = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  align-items: center;

  ${(props) =>
    props.isDarkMode
      ? css`
          justify-content: flex-start;
          margin-left: 4px;
          margin-right: 22px;
        `
      : css`
          justify-content: flex-end;
          margin-right: 4px;
          margin-left: 22px;
        `};
`;

const Rectangle = styled.div<StyledProps>`
  width: 18px;
  height: 18px;
  position: absolute;

  ${(props) =>
    props.isDarkMode
      ? css`
          left: calc(100% - 20px);
        `
      : css`
          left: 2px;
        `}
  transition: left 200ms, width 200ms;
  border-radius: 16px;
  background-color: white;
  filter: drop-shadow(0px 2px 4px rgba(0, 35, 11, 0.2));
`;
