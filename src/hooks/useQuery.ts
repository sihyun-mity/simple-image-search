import queryStringLib from 'query-string';

export default function useQuery() {
  const queryString = () => queryStringLib.parse(window.location.search);

  return queryString();
}
