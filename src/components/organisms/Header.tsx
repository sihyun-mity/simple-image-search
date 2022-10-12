import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { displayMode, isDarkMode } from '../../store';
import { DisplayModeControl } from '../atoms';
import { ReactComponent as Logo } from '../../assets/images/SimpleImageSearch_Logo.svg';
import search from '../../assets/images/search.png';
import DisplayModePropsType from '../../types/DisplayModePropsType';
import { useCustomNavigate } from '../../hooks';

const Header = (): JSX.Element => {
  const displayTheme = useRecoilValue(displayMode);
  const darkModeState = useRecoilValue(isDarkMode);
  const navigate = useCustomNavigate();

  const returnHome = (): void => navigate('', { replace: true });

  return (
    <Box displayTheme={displayTheme} darkModeState={darkModeState}>
      <DisplayModeControl />
      <Logo onClick={() => returnHome()} />
      <SearchIcon src={search} darkModeState={darkModeState} />
    </Box>
  );
};

export default Header;

const Box = styled.header<DisplayModePropsType>`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const SearchIcon = styled.img<DisplayModePropsType>`
  max-width: 20px;
  max-height: 20px;
  cursor: pointer;

  ${(props) =>
    props.darkModeState &&
    css`
      filter: invert(100%) sepia(5%) saturate(5849%) hue-rotate(166deg) brightness(105%) contrast(104%);
    `}
`;
