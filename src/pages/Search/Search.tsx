import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useMountEffect, usePathQuery } from '../../hooks';
import { headerSearchBar } from '../../store';
import SearchResponseDataModel from './types/SearchResponseDataModel';

const Search = (): JSX.Element => {
  const qs = usePathQuery();
  const { pathname } = useLocation();
  const setHeaderSearchBar = useSetRecoilState(headerSearchBar);
  const refetch = useRef<boolean>(false);

  const fetchData = async (): Promise<void> => {
    const headers = { 'Ocp-Apim-Subscription-Key': process.env.REACT_APP_API_KEY };
    const params = { q: qs['keyword'], mkt: navigator.language, count: 150, safeSearch: 'Off' };
    const { data } = await axios(`https://api.bing.microsoft.com/v7.0/images/search`, { headers, params });

    return data;
  };

  const { data }: { data?: SearchResponseDataModel } = useQuery([`searchData`, refetch.current], fetchData, {
    staleTime: Infinity,
    suspense: true,
  });

  const { value: images } = { ...data };

  useMountEffect(() => setHeaderSearchBar(true));

  useEffect(() => {
    refetch.current = true;
  }, [pathname]);

  return (
    <Box>
      <Items>
        {images?.map(
          (item, index) =>
            index % 2 !== 0 && (
              <Item key={index}>
                <Image src={item.thumbnailUrl} />
                <Name>{item.name}</Name>
              </Item>
            ),
        )}
      </Items>
      <Items>
        {images?.map(
          (item, index) =>
            index % 2 === 0 && (
              <Item key={index}>
                <Image src={item.thumbnailUrl} />
                <Name>{item.name}</Name>
              </Item>
            ),
        )}
      </Items>
    </Box>
  );
};

export default Search;

const Box = styled.article`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 16px;
`;

const Items = styled.div`
  width: calc(50% - 10px);

  &:nth-child(odd) {
    margin-right: 20px;
  }
`;

const Item = styled.div`
  width: 100%;
  height: fit-content;
  display: inline-flex;
  flex-direction: column;
  background-color: green;
  margin-bottom: 16px;
`;

const Image = styled.img`
  /* max-width: 100%;
  max-height: 100%; */
`;

const Name = styled.label`
  color: white;
`;
