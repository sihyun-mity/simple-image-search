import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { displayMode } from '../../store';
import DisplayModeType from '../../types/DisplayModeType';
import { DisplayModeControl } from '../atoms';
import { ReactComponent as Logo } from '../../assets/images/SimpleImageSearch_Logo.svg';
import search from '../../assets/images/search.png';

const Header = () => {
  const displayTheme = useRecoilValue(displayMode);

  const returnHome = () => window.location.assign('/');

  return (
    <Box browserMode={displayTheme}>
      <DisplayModeControl />
      <Logo onClick={() => returnHome()} />
      <SearchIcon src={search} isDarkMode={displayTheme === 'dark' ? true : false} />
    </Box>
  );
};

export default Header;

const Box = styled.header<{ browserMode: DisplayModeType }>`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  box-sizing: border-box;

  ${(props) => props.theme[props.browserMode].colors.header};

  & > svg {
    width: 70%;
    height: 70%;
    margin: 0 8px;
    cursor: pointer;

    path {
      fill: ${(props) => (props.browserMode === 'dark' ? '#fff' : '#000')};
    }
  }
`;

const SearchIcon = styled.img<{ isDarkMode: boolean }>`
  max-width: 20px;
  max-height: 20px;
  cursor: pointer;

  ${(props) =>
    props.isDarkMode &&
    css`
      filter: invert(100%) sepia(5%) saturate(5849%) hue-rotate(166deg) brightness(105%) contrast(104%);
    `}
`;
