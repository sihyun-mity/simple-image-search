import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useMountEffect, usePathQuery } from '../../hooks';
import { headerSearchBar } from '../../store';

const Search = (): JSX.Element => {
  const qs = usePathQuery();
  const setHeaderSearchBar = useSetRecoilState(headerSearchBar);
  const [page, setPage] = useState<number>(0);

  const fetchData = async (): Promise<void> => {
    const headers = { 'Ocp-Apim-Subscription-Key': process.env.REACT_APP_API_KEY };
    const params = { q: qs['keyword'], mkt: navigator.language, count: 150, safeSearch: 'Off' };
    const { data } = await axios(`https://api.bing.microsoft.com/v7.0/images/search`, { headers, params });
  };

  // const { data } = useQuery(`searchData`, fetchData, { staleTime: Infinity, suspense: true });

  useMountEffect(() => setHeaderSearchBar(true));

  return <div></div>;
};

export default Search;
