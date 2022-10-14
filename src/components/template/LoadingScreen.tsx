import styled from 'styled-components';
import Loading from 'react-loading';
import { useRecoilValue } from 'recoil';
import { isDarkMode } from '../../store';

const LoadingScreen = () => {
  const darkModeState = useRecoilValue(isDarkMode);

  return (
    <Box>
      <Loading type="bubbles" color={darkModeState ? `#fff` : `#000`} />
      <Text color={darkModeState ? `#fff` : `#000`}>
        The page is being prepared,
        <br />
        please wait for a moment.
      </Text>
    </Box>
  );
};

export default LoadingScreen;

const Box = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    transition: none;
  }
`;

const Text = styled.p<{ color: string }>`
  margin-bottom: 0;
  text-align: center;
  color: ${(props) => props.color};
`;
