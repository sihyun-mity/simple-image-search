import { useMountEffect, useQuery } from '../../hooks';

const Search = (): JSX.Element => {
  const qs = useQuery();

  const fetchData = (): void => {
    console.log(qs);
  };

  useMountEffect(() => fetchData());

  return <div></div>;
};

export default Search;
