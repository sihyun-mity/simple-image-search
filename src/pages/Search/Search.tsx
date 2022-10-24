import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { useMountEffect, usePathQuery } from '../../hooks';
import { displayMode, headerSearchBar, orientationType, responsiveType } from '../../store';
import DisplayModeType from '../../types/DisplayModeType';
import OrientationType from '../../types/OrientationType';
import ResponsiveType from '../../types/ResponsiveType';
import SearchResponseDataModel from './types/SearchResponseDataModel';

interface ItemPropsType {
  displayTheme: DisplayModeType;
  deviceResponsive: ResponsiveType;
  deviceOrientation: OrientationType;
}

const Search = (): JSX.Element => {
  const qs = usePathQuery();
  const setHeaderSearchBar = useSetRecoilState(headerSearchBar);
  const deviceResponsive = useRecoilValue(responsiveType);
  const deviceOrientation = useRecoilValue(orientationType);
  const displayTheme = useRecoilValue(displayMode);
  const [itemsLine, setItemsLine] = useState<number[]>();

  const calculateItemsLine = useCallback((): void => {
    let count: number;

    switch (deviceResponsive) {
      case 'mobile':
        count = 2;
        break;

      case 'tablet':
        count = 3;
        break;

      case 'pc':
        count = 4;
        break;
    }

    if (deviceOrientation === 'landscape') count *= 2;

    setItemsLine(new Array(count).fill(1));
  }, [deviceResponsive, deviceOrientation]);

  const fetchData = async (): Promise<void> => {
    const headers = { 'Ocp-Apim-Subscription-Key': process.env.REACT_APP_API_KEY };
    const params = { q: qs['keyword'], mkt: navigator.language, count: 150, safeSearch: 'Off' };
    const { data } = await axios(`https://api.bing.microsoft.com/v7.0/images/search`, { headers, params });

    return data;
  };

  const { data }: { data?: SearchResponseDataModel } = useQuery(['searchData', qs['keyword']], fetchData, {
    staleTime: Infinity,
    suspense: true,
  });

  const { value: images } = { ...data };

  useEffect(() => calculateItemsLine(), [calculateItemsLine]);

  useMountEffect(() => setHeaderSearchBar(true));

  return (
    <Box>
      <ResultBox count={itemsLine?.length || 0}>
        {itemsLine?.map((item, index) => (
          <div key={index}>
            {(() => {
              let startIdx: number = index;

              return images?.map((item, index) => {
                const findIdx: number = startIdx;
                startIdx += itemsLine.length;

                return (
                  images[findIdx] && (
                    <Item
                      key={index}
                      displayTheme={displayTheme}
                      deviceResponsive={deviceResponsive}
                      deviceOrientation={deviceOrientation}
                    >
                      <ImageBox>
                        <Image src={images[findIdx].thumbnailUrl} />
                      </ImageBox>
                      <Name>{images[findIdx].name}</Name>
                    </Item>
                  )
                );
              });
            })()}
          </div>
        ))}
      </ResultBox>
      <More displayTheme={displayTheme} onClick={() => window.open(data?.webSearchUrl)}>
        찾는 이미지가 없나요?
      </More>
    </Box>
  );
};

export default Search;

const Box = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

const ResultBox = styled.div<{ count: number }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  & > div {
    width: calc(100% / ${(props) => props.count} - 10px);
  }
`;

const Item = styled.div<ItemPropsType>`
  width: 100%;
  height: fit-content;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 12px;
  border-radius: 6px;

  ${(props) => props.theme[props.displayTheme].colors.item};

  ${(props) =>
    (props.deviceOrientation === 'landscape' || props.deviceResponsive !== 'mobile') &&
    css`
      height: 22vh;

      & > div {
        width: 100%;
        height: 18vh;
      }
    `}
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Name = styled.label`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  padding: 0 8px;
  margin-top: 10px;
  font-size: 0.8rem;
  text-align: center;
  word-break: break-all;
  overflow: hidden;
`;

const More = styled.button<{ displayTheme: DisplayModeType }>`
  margin: 8px 0 20px;
  padding: 8px 16px;
  background-color: unset;
  border-radius: 99px;
  box-sizing: border-box;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  ${(props) => props.theme[props.displayTheme].colors.more};
`;
