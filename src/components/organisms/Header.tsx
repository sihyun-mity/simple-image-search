import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { displayMode, isDarkMode, isMobile } from '../../store';
import { DisplayModeControl } from '../atoms';
import { ReactComponent as Logo } from '../../assets/images/SimpleImageSearch_Logo.svg';
import search from '../../assets/images/search.png';
import DisplayModePropsType from '../../types/DisplayModePropsType';

const Header = (): JSX.Element => {
  const displayTheme = useRecoilValue(displayMode);
  const darkModeState = useRecoilValue(isDarkMode);
  const mobileDevice = useRecoilValue(isMobile);

  const returnHome = (): void => window.location.assign('/simple-image-search');

  return mobileDevice ? (
    <Box displayTheme={displayTheme} darkModeState={darkModeState}>
      <DisplayModeControl />
      <Logo onClick={() => returnHome()} />
      <SearchIcon src={search} darkModeState={darkModeState} />
    </Box>
  ) : (
    <DesktopBox displayTheme={displayTheme} darkModeState={darkModeState}>
      <Logo onClick={() => returnHome()} />
      <DesktopSearchIcon src={search} darkModeState={darkModeState} />
      <DisplayModeControl />
    </DesktopBox>
  );
};

export default Header;

const Box = styled.header<DisplayModePropsType>`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
  padding: 12px 20px;
  box-sizing: border-box;

  ${(props) => props.displayTheme && props.theme[props.displayTheme].colors.header};

  & > svg {
    max-width: 70%;
    height: 70%;
    margin: 0 8px;
    cursor: pointer;

    path {
      fill: ${(props) => (props.darkModeState ? '#fff' : '#000')};
    }
  }
`;

const DesktopBox = styled(Box)`
  justify-content: flex-start;

  & > svg {
    margin: 0 auto 0 0;
  }
`;

const SearchIcon = styled.img<DisplayModePropsType>`
  max-width: 20px;
  max-height: 20px;
  padding: 4px;
  cursor: pointer;
  -webkit-user-drag: none;

  ${(props) =>
    props.darkModeState &&
    css`
      filter: invert(100%) sepia(5%) saturate(5849%) hue-rotate(166deg) brightness(105%) contrast(104%);
    `}
`;

const DesktopSearchIcon = styled(SearchIcon)`
  margin-right: 10px;
`;
