import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { displayMode } from '@/store';
import DisplayModePropsType from '@/types/DisplayModePropsType';
import { Header } from '../organisms';
import LoadingScreen from './LoadingScreen';
import MetaTag from './MetaTag';

const Container = (): JSX.Element => {
  const displayTheme = useRecoilValue(displayMode);

  return (
    <>
      <MetaTag />
      <Layout displayTheme={displayTheme}>
        <Header />
        <Content>
          <Suspense fallback={<LoadingScreen description="loading" />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </>
  );
};

export default Container;

const Layout = styled.main<DisplayModePropsType>`
  min-width: 100vw;
  display: flex;
  flex-direction: column;

  ${(props) => props.displayTheme && props.theme[props.displayTheme].colors.body};
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 56px;

  & > * {
    margin: 0 20px;
  }
`;
