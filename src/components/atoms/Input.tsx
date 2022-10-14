import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { displayMode } from '../../store';
import InputPropsType from './types/InputPropsType';

interface StyledPropsType extends InputPropsType {
  [props: string]: any;
}

const Input = (props: InputPropsType) => {
  const { width = '100%', height = '32px', color } = props;
  const displayTheme = useRecoilValue(displayMode);

  return <Box width={width} height={height} color={color} displayTheme={displayTheme}></Box>;
};

export default Input;

const Box = styled.label<StyledPropsType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  ${(props) => props.theme[props.displayTheme].colors.input}
`;
