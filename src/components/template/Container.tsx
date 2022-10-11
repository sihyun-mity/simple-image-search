import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { displayMode } from '../../store';
import DisplayModeType from '../../types/DisplayModeType';
import { Header } from '../organisms';
import MetaTag from './MetaTag';

const Container = (props: { children: JSX.Element }): JSX.Element => {
  const displayTheme = useRecoilValue(displayMode);

  return (
    <>
      <MetaTag />
      <Layout browserMode={displayTheme}>
        <Header />
        {props.children}
      </Layout>
    </>
  );
};

export default Container;

const Layout = styled.div<{ browserMode: DisplayModeType }>`
  min-width: 100vw;
  min-height: 100vh;

  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }

  display: flex;
  flex-direction: column;

  ${(props) => props.theme[props.browserMode].colors.body};
`;
