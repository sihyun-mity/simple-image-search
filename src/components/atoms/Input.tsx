import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { displayMode, isDarkMode } from '../../store';
import InputPropsType from './types/InputPropsType';
import search from '../../assets/images/search.png';

interface StyledPropsType extends InputPropsType {
  [props: string]: any;
}

const Input = (props: InputPropsType) => {
  const { width = '100%', height = '44px', color, value, func } = props;
  const displayTheme = useRecoilValue(displayMode);
  const darkModeState = useRecoilValue(isDarkMode);
  const [focus, setFocus] = useState<boolean>(false);
  const inputValue = useRef<string>();

  return (
    <Box
      width={width}
      height={height}
      color={color}
      displayTheme={displayTheme}
      darkModeState={darkModeState}
      focus={focus}
    >
      <InputBox
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={(e) => e.key === 'Enter' && inputValue.current && func && func(inputValue.current)}
        onChange={(e) => (inputValue.current = e.target.value)}
        defaultValue={value}
      />
      <SearchIcon
        src={search}
        darkModeState={darkModeState}
        onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
        onClick={() => func && inputValue.current && func(inputValue.current)}
      />
    </Box>
  );
};

export default Input;

const Box = styled.label<StyledPropsType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  position: relative;
  padding: 12px;
  border-radius: 4px;
  box-sizing: border-box;
  opacity: 0.8;
  cursor: text;

  ${(props) => props.theme[props.displayTheme].colors.input}

  background-color: ${(props) => props.color};

  &::before {
    content: '';
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
    border-radius: inherit;
    transition: box-shadow 200ms;

    ${(props) =>
      props.focus &&
      css`
        box-shadow: 0px 0px 0px 4px ${props.darkModeState ? `rgba(255, 255, 255, 0.6)` : `rgba(55, 55, 55, 0.6)`};
      `}
  }
`;

const InputBox = styled.input`
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: inherit;
  box-sizing: border-box;
  background-color: unset;
  color: inherit;

  &:focus {
    outline: 0;
  }
`;

const SearchIcon = styled.img<StyledPropsType>`
  max-width: 100%;
  max-height: 100%;
  margin-left: 10px;
  cursor: pointer;

  ${(props) =>
    props.darkModeState &&
    css`
      filter: invert(100%) sepia(5%) saturate(5849%) hue-rotate(166deg) brightness(105%) contrast(104%);
    `}
`;