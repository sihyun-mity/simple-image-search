import { useQueryClient } from 'react-query';
import { createSearchParams } from 'react-router-dom';
import { useCustomNavigate, usePathQuery } from '@/hooks';
import { Input } from '../atoms';
import InputPropsType from '../atoms/types/InputPropsType';

interface SearchBarPropsType extends InputPropsType {}

const SearchBar = (props: SearchBarPropsType) => {
  const navigate = useCustomNavigate();
  const qs = usePathQuery();
  const queryClient = useQueryClient();

  const searchImage = (keyword: string): void => {
    navigate(`/search?${createSearchParams({ keyword })}`);
    queryClient.invalidateQueries('searchData');
  };

  return <Input {...props} func={(value) => searchImage(value)} defaultValue={qs['keyword'] as string} />;
};

export default SearchBar;
