import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import { DataStringDevice, DeviceDataString } from '../DeviceDataString';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import { RenderReadingFields } from '01/features/readings/displayReadingHistory/components/ReadingFields';
import { SwitchIndividualDeviceReadingsCreateRequest } from '../../../../../../myApi';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';

interface Props {
  readings: SwitchIndividualDeviceReadingsCreateRequest[];
  onChange: (readings: SwitchIndividualDeviceReadingsCreateRequest[]) => void;
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

  const defaultValues = device.rateType
    ? getArrayByCountRange(
        getIndividualDeviceRateNumByName(device.rateType),
        () => ''
      )
    : [''];

  console.log(readings);

  return (
    <Wrap>
      <DeviceInfo>
        <Title>{title}</Title>
        <Space />
        <DeviceDataString device={device} />
      </DeviceInfo>
      <ReadingsWrap>
        <Flex style={{ justifyContent: 'space-between', maxWidth: 140 }}>
          <div>{'<'}</div>
          <div>Январь 2021</div>
          <div>{'>'}</div>
        </Flex>

        <Flex style={{ justifyContent: 'Center', maxWidth: 140 }}>
          <div>Февраль 2021</div>
        </Flex>

        <RenderReadingFields
          style={{ marginRight: 0 }}
          values={defaultValues}
          editable
          suffix={device.measurableUnitString}
        />

        <RenderReadingFields
          style={{ marginRight: 0 }}
          values={defaultValues}
          editable
          suffix={device.measurableUnitString}
        />
      </ReadingsWrap>
    </Wrap>
  );
};

const Title = styled.div`
  font-size: 15px;
  color: rgba(39, 47, 90, 0.7);
`;

const Wrap = styled(Flex)`
  box-shadow: 0 4px 8px rgba(78, 93, 146, 0.16);
  padding: 15px 20px;
  justify-content: space-between;
`;

const DeviceInfo = styled.div``;

const ReadingsWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

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
