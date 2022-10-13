import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { displayMode, viewHeight } from '../../store';
import DisplayModePropsType from '../../types/DisplayModePropsType';
import { Header } from '../organisms';
import LoadingScreen from './LoadingScreen';
import MetaTag from './MetaTag';

const Container = (): JSX.Element => {
  const displayTheme = useRecoilValue(displayMode);
  const vh = useRecoilValue(viewHeight);

  return (
    <>
      <MetaTag />
      <Layout displayTheme={displayTheme}>
        <Header />
        <Content vh={vh}>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </Content>
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

  * {
    transition: unset;
  }

  & > * {
    margin: 0 20px;
  }
`;