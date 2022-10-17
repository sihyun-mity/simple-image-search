import { ChangeEvent, HTMLAttributes, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface PropsType extends HTMLAttributes<HTMLLabelElement> {
  display?: 'text';
  size: 'medium' | 'small';
  value?: boolean;
  func?: (value: boolean) => void;
}

interface StyledProps extends PropsType {
  checked: boolean;
  [props: string]: any;
}

interface PresetModel {
  [index: string]: { width: string; height: string; circle: string };
}

const preset: PresetModel = {
  medium: {
    width: '44px',
    height: '22px',
    circle: '18px',
  },
  small: {
    width: '28px',
    height: '16px',
    circle: '12px',
  },
};

const ToggleSwitch = (props: PropsType): JSX.Element => {
  const { display, size, value, func } = props;
  const [checked, setChecked] = useState<boolean>(value || false);

  const renderDisplay = (): JSX.Element => {
    if (display) {
      switch (display) {
        case 'text':
          return <Text>{checked ? `ON` : `OFF`}</Text>;

        default:
          return <></>;
      }
    } else return <></>;
  };

  const handleToggleState = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    const prevState = checked;

    setChecked(value);

    if (func) {
      try {
        func(value);
      } catch (e) {
        setChecked(prevState);
      }
    }
  };

  useEffect(() => {
    value !== undefined && setChecked(value);
  }, [value]);

  return (
    <Box {...props} checked={checked}>
      <input type="checkbox" checked={checked} onChange={(e) => handleToggleState(e)} hidden />
      <Background checked={checked} size={size}>
        {renderDisplay()}
      </Background>
      <Rectangle checked={checked} size={size} />
    </Box>
  );
};

export default ToggleSwitch;

const Box = styled.label<StyledProps>`
  display: flex;
  align-items: center;
  position: relative;
  min-width: ${(props) => preset[props.size].width};
  min-height: ${(props) => preset[props.size].height};
  max-width: max-content;
  padding: 2px;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: ${(props) => (props.checked ? `#49cc8d` : `grey`)};
  cursor: pointer;
  user-select: none;

  &:active:hover {
    & > div:last-of-type {
      width: calc(${(props) => preset[props.size].circle} + 6px);

      ${(props) =>
        props.checked &&
        css`
          left: calc(100% - ${preset[props.size].circle} - 8px);
        `}
    }
  }

  * {
    -webkit-user-drag: none;
  }
`;

const Background = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  align-items: center;

  ${(props) =>
    props.checked
      ? css`
          justify-content: flex-start;
          margin-left: 4px;
          margin-right: calc(${preset[props.size].circle} + 4px);
        `
      : css`
          justify-content: flex-end;
          margin-right: 4px;
          margin-left: calc(${preset[props.size].circle} + 4px);
        `};
`;

const Text = styled.span`
  width: 100%;
  color: white;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1;
`;

const Rectangle = styled.div<StyledProps>`
  width: ${(props) => preset[props.size].circle};
  height: ${(props) => preset[props.size].circle};
  position: absolute;

  ${(props) =>
    props.checked
      ? css`
          left: calc(100% - ${preset[props.size].circle} - 2px);
        `
      : css`
          left: 2px;
        `}
  transition: left 200ms, width 200ms;
  border-radius: 16px;
  background-color: white;
  filter: drop-shadow(0px 2px 4px rgba(0, 35, 11, 0.2));
`;
