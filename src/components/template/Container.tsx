import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { displayMode, viewHeight } from '../../store';
import DisplayModePropsType from '../../types/DisplayModePropsType';
import { Header } from '../organisms';
import MetaTag from './MetaTag';

const Container = (props: { children: JSX.Element }): JSX.Element => {
  const displayTheme = useRecoilValue(displayMode);
  const vh = useRecoilValue(viewHeight);

  return (
    <>
      <MetaTag />
      <Layout displayTheme={displayTheme}>
        <Header />
        <Content vh={vh}>{props.children}</Content>
      </Layout>
    </>
  );
};

export default Container;

const Layout = styled.div<DisplayModePropsType>`
  min-width: 100vw;
  display: flex;
  flex-direction: column;

  ${(props) => props.displayTheme && props.theme[props.displayTheme].colors.body};
`;

const Content = styled.section<{ vh: number }>`
  height: calc(${(props) => props.vh * 100}px - 56px);
  display: flex;
  flex-direction: column;
  margin: 12px 20px 0;

  * {
    transition: unset;
  }
`;
