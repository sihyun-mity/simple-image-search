import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { usePathQuery } from '../../hooks';

const Search = (): JSX.Element => {
  const qs = usePathQuery();
  const [page, setPage] = useState<number>(0);

  const fetchData = async () => {
    const headers = { 'Ocp-Apim-Subscription-Key': process.env.REACT_APP_API_KEY };
    const params = { q: qs['keyword'], mkt: navigator.language, count: 150, safeSearch: 'Off' };

    const { data } = await axios(`https://api.bing.microsoft.com/v7.0/images/search`, { headers, params });

    console.log(data);
  };

  const { data } = useQuery(`searchData`, fetchData, { staleTime: Infinity, suspense: true });

  return <div></div>;
};

export default Search;
