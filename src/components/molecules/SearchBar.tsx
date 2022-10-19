import { createSearchParams } from 'react-router-dom';
import { useCustomNavigate } from '../../hooks';
import { Input } from '../atoms';
import InputPropsType from '../atoms/types/InputPropsType';

interface SearchBarPropsType extends InputPropsType {}

const SearchBar = (props: SearchBarPropsType) => {
  const navigate = useCustomNavigate();

  const searchImage = (keyword: string): void => navigate(`/search?${createSearchParams({ keyword })}`);

  return <Input {...props} func={(value) => searchImage(value)} />;
};

export default SearchBar;
