import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import arrow from '../../../assets/images/chevron-upwards-arrow.png';
import { isMobile } from '../../../store';

const Attribution = () => {
  const [open, setOpen] = useState(false);
  const mobileDevice = useRecoilValue(isMobile);

  return (
    <Box open={open} mobileDevice={mobileDevice}>
      {mobileDevice && (
        <Button onClick={() => setOpen((prev) => !prev)}>
          <Text>Attributes</Text>
          <Arrow src={arrow} open={open} />
        </Button>
      )}
      <Attributes mobileDevice={mobileDevice}>
        <Attribute href="https://www.flaticon.com/free-icons/photo" title="photo icons">
          Photo icons created by Freepik
        </Attribute>
        <Attribute href="https://www.flaticon.com/free-icons/close" title="close icons">
          Close icons created by Pixel perfect
        </Attribute>
        <Attribute href="https://www.flaticon.com/free-icons/top" title="top icons">
          Top icons created by gariebaldy
        </Attribute>
        <Attribute href="https://www.flaticon.com/free-icons/moon" title="moon icons">
          Moon icons created by Good Ware
        </Attribute>
        <Attribute href="https://www.flaticon.com/free-icons/search" title="search icons">
          Search icons created by Smashicons
        </Attribute>
        <Attribute href="https://picsum.photos" title="Lorem Picsum">
          Background images used by Lorem Picsum
        </Attribute>
      </Attributes>
    </Box>
  );
};

export default Attribution;

const Box = styled.div<{ open: boolean; mobileDevice: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 12px;

  ${(props) =>
    props.mobileDevice &&
    css`
      transform: translate3d(${props.open ? `0, 0, 0` : `0, calc(100% + 12px - 32px), 0`});
      transition: transform 200ms;
    `}
`;

const Button = styled.button`
  height: 32px;
  display: flex;
  align-items: center;
  background: unset;
  border: unset;
  padding: 0 4px;
`;

const Text = styled.label`
  font-size: 0.8rem;
  color: #808080;
`;

const Arrow = styled.img<{ open: boolean }>`
  max-width: 10px;
  max-height: 10px;
  margin-left: 4px;
  filter: invert(56%) sepia(0%) saturate(0%) hue-rotate(230deg) brightness(90%) contrast(87%);
  transform: ${(props) => (props.open ? `rotate(180deg)` : `rotate(0)`)};
  transition: transform 200ms;
`;

const Attributes = styled.footer<{ mobileDevice: boolean }>`
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.mobileDevice
      ? css`
          text-align: center;
        `
      : css`
          position: fixed;
          left: 20px;
          bottom: 16px;
        `}

  & > *:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const Attribute = styled.a`
  font-size: 0.8rem;
  font-weight: lighter;
  color: #808080;
  text-decoration: none;
`;
