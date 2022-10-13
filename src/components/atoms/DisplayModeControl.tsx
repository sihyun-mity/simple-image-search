import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { displayMode } from '../../store';
import sun from '../../assets/images/sun.png';
import moon from '../../assets/images/moon.png';

interface StyledProps {
  isDarkMode: boolean;
}

const DisplayModeControl = (): JSX.Element => {
  const [displayTheme, setDisplayTheme] = useRecoilState(displayMode);
  const isDarkMode: boolean = useMemo(() => (displayTheme === 'dark' ? true : false), [displayTheme]);

  const reverseDisplayMode = (): void => {
    const reverseMode = displayTheme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', reverseMode);
    setDisplayTheme(reverseMode);
  };

  return (
    <Box isDarkMode={isDarkMode}>
      <input type="checkbox" checked={isDarkMode} onChange={() => reverseDisplayMode()} hidden />
      <DarkMode src={isDarkMode ? moon : sun} isDarkMode={isDarkMode} />
    </Box>
  );
};

export default DisplayModeControl;

const Box = styled.label<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;

  * {
    -webkit-user-drag: none;
  }
`;

const DarkMode = styled.img<{ isDarkMode: boolean }>`
  max-width: 20px;
  max-height: 20px;
  padding: 4px;
  cursor: pointer;

  ${(props) =>
    props.isDarkMode &&
    css`
      filter: invert(100%) sepia(5%) saturate(5849%) hue-rotate(166deg) brightness(105%) contrast(104%);
    `}
`;
