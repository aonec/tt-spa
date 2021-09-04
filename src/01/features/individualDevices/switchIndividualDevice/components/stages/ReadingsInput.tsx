import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import { DataStringDevice, DeviceDataString } from '../DeviceDataString';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';

export interface ReadingInputElem {
  value1: number | null;
  value2?: number | null;
  value3?: number | null;
  value4?: number | null;
  readingDate: string;
}

interface Props {
  readings: ReadingInputElem[];
  onChange: (readings: ReadingInputElem[]) => void;
  title: string;
  device: DataStringDevice;
}

export const ReadingsInput: React.FC<Props> = ({
  title,
  device,
  readings,
  onChange,
}) => {
  const { sliderIndex, up, down } = useSliderIndex();

  return (
    <Wrap>
      <DeviceInfo>
        <Title>{title}</Title>
        <Space />
        <DeviceDataString device={device} />
      </DeviceInfo>
      <ReadingsWrap>

      </ReadingsWrap>
    </Wrap>
  );
};

const HalfBlock = styled.div`
  width: 50%;
`;

const Title = styled.div`
  font-size: 15px;
  color: rgba(39, 47, 90, 0.7);
`;

const Wrap = styled(Flex)`
box-shadow: 0 4px 8px rgba(78, 93, 146, 0.16);
padding: 15px;
  justify-content: space-between;
  `;

const DeviceInfo = styled(HalfBlock)``;

const ReadingsWrap = styled(HalfBlock)``;

function useSliderIndex() {
  const [sliderIndex, setSliderIndex] = useState(0);

  return {
    sliderIndex,
    up() {
      setSliderIndex((prev) => (prev !== 2 ? ++prev : prev));
    },
    down() {
      setSliderIndex((prev) => (prev !== 0 ? --prev : prev));
    },
  };
}