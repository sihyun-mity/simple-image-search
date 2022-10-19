import queryStringLib from 'query-string';

export default function usePathQuery() {
  const queryString = () => queryStringLib.parse(window.location.search);

  return queryString();
}
