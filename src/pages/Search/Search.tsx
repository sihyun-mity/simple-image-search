import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useMountEffect, usePathQuery } from '../../hooks';
import { displayMode, headerSearchBar, orientationType, responsiveType } from '../../store';
import DisplayModeType from '../../types/DisplayModeType';
import SearchResponseDataModel from './types/SearchResponseDataModel';

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
    <Box count={itemsLine?.length || 0}>
      {itemsLine?.map((item, index) => (
        <div key={index}>
          {(() => {
            let startIdx: number = index;

            return images?.map((item, index) => {
              const findIdx: number = startIdx;
              startIdx += itemsLine.length;

              return (
                images[findIdx] && (
                  <Item key={index} displayTheme={displayTheme}>
                    <Image src={images[findIdx].thumbnailUrl} />
                    <Name>{images[findIdx].name}</Name>
                  </Item>
                )
              );
            });
          })()}
        </div>
      ))}
    </Box>
  );
};

export default Search;

const Box = styled.article<{ count: number }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 16px;

  & > div {
    width: calc(100% / ${(props) => props.count} - 10px);
  }
`;

const Item = styled.div<{ displayTheme: DisplayModeType }>`
  width: 100%;
  height: fit-content;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 16px;

  ${(props) => props.theme[props.displayTheme].colors.item};
`;

const Image = styled.img``;

const Name = styled.label`
  margin-top: 6px;
  font-size: 0.8rem;
  word-break: break-all;
`;
