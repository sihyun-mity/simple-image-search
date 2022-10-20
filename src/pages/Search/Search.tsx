import axios from 'axios';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useMountEffect, usePathQuery } from '../../hooks';
import { headerSearchBar } from '../../store';
import SearchResponseDataModel from './types/SearchResponseDataModel';

const Search = (): JSX.Element => {
  const qs = usePathQuery();
  const setHeaderSearchBar = useSetRecoilState(headerSearchBar);

  const fetchData = async (): Promise<void> => {
    const headers = { 'Ocp-Apim-Subscription-Key': process.env.REACT_APP_API_KEY };
    const params = { q: qs['keyword'], mkt: navigator.language, count: 150, safeSearch: 'Off' };
    const { data } = await axios(`https://api.bing.microsoft.com/v7.0/images/search`, { headers, params });

    return data;
  };

  const { data }: { data?: SearchResponseDataModel } = useQuery(`searchData`, fetchData, {
    staleTime: Infinity,
    suspense: true,
  });

  const { value: images } = { ...data };

  useMountEffect(() => setHeaderSearchBar(true));

  return (
    <Box>
      {images?.map((item, index) => (
        <Item key={index}>
          <Image src={item.thumbnailUrl} />
          <Name>{item.name}</Name>
        </Item>
      ))}
    </Box>
  );
};

export default Search;

const Box = styled.article`
  display: grid;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Image = styled.img`
  max-width: 20vw;
  max-height: 20vw;
`;

const Name = styled.label`
  color: white;
`;
