import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { displayMode, isDarkMode } from '../../store';
import InputPropsType from './types/InputPropsType';

interface StyledPropsType extends InputPropsType {
  [props: string]: any;
}

const Input = (props: InputPropsType) => {
  const { width = '100%', height = '48px', color } = props;
  const displayTheme = useRecoilValue(displayMode);
  const darkModeState = useRecoilValue(isDarkMode);
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <Box
      width={width}
      height={height}
      color={color}
      displayTheme={displayTheme}
      darkModeState={darkModeState}
      focus={focus}
    >
      <InputBox {...props} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
    </Box>
  );
};

export default Input;

const Box = styled.label<StyledPropsType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;

  ${(props) => props.theme[props.displayTheme].colors.input}

  background-color: ${(props) => props.color};
  opacity: 0.8;
  transition: box-shadow 200ms;

  ${(props) =>
    props.focus &&
    css`
      box-shadow: 0px 0px 0px 4px ${props.darkModeState ? `rgba(0, 0, 0, 0.4)` : `rgba(255, 255, 255, 0.4)`};
    `}
`;

const InputBox = styled.input`
  width: 100%;
  height: 100%;
  padding: 12px;
  border: 0;
  border-radius: inherit;
  box-sizing: border-box;
  background-color: unset;
  color: inherit;

  &:focus {
    outline: 0;
  }
`;
