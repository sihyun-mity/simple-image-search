import styled from 'styled-components';

const Home = (): JSX.Element => {
  return (
    <Box>
      <StartUp>Search anything to get started!</StartUp>
    </Box>
  );
};

export default Home;

const Box = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StartUp = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  text-align: center;
`;
