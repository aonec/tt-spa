import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import rateTypeToNumber from '../../../../../_api/utils/rateTypeToNumber';
import DeviceIcons from '../../../../../_components/DeviceIcons';
import { Icon } from '../../../../../_components/Icon';
import styles from '../../../../Devices/components/TabsDevices.module.scss';
import {
  getNextPreviousReading,
  round,
  useReadings,
} from '../../../../../hooks/useReadings';
import { isNullInArray } from '../../../../../utils/checkArrayForNulls';
import { useDispatch } from 'react-redux';
import { setInputUnfocused } from '01/Redux/ducks/readings/actionCreators';
import { v4 as uuid } from 'uuid';
import { IndividualDeviceListItemResponse } from '../../../../../../myApi';
import { Flex } from '01/shared/ui/Layout/Flex';
import { openReadingsHistoryModal } from '01/features/readings/displayReadingHistory/models';
import { HistoryIcon } from "ui-kit/icons";

export const HouseReadingLine: React.FC<Props> = React.memo(
  ({ device, numberOfPreviousReadingsInputs, sliderIndex, disabled }) => {
    const { readingsState, previousReadings, currentReadings } = useReadings(
      device,
      sliderIndex,
      numberOfPreviousReadingsInputs,
      false
    );

    const dispatch = useDispatch();

    const [consumptionState, setConsumptionState] = useState<
      (number | string)[]
    >([]);

    const numberOfReadings: number = rateTypeToNumber(device.rateType);

    //useConsumption
    useEffect(() => {
      if (!readingsState) return;
      const currentReadings = readingsState?.currentReadingsArray || {};
      const previousReadings: any = getNextPreviousReading(
        readingsState?.previousReadings,
        -1
      );
      let consumptionArray = Array.from(
        { length: numberOfReadings },
        (v, i) => i
      );
      const consumption = consumptionArray.map((_, index) => {
        return (
          round(
            +currentReadings[index] - +previousReadings?.values[index] > 0
              ? +currentReadings[index] - +previousReadings?.values[index]
              : 0,
            3
          ) || ''
        );
      });

      setConsumptionState(consumption);
    }, [readingsState]);

    //useInputsUnfocused
    useEffect(() => {
      if (!readingsState) return;
      const isNull = isNullInArray(readingsState.currentReadingsArray);

      if (!isNull) {
        dispatch(setInputUnfocused());
      }
    }, [readingsState]);

    const consumptionElems = consumptionState.map((el) => {
      return <Consumption key={uuid()}>{el}</Consumption>;
    });

    const { icon, color } = DeviceIcons[device.resource];
    return (
      <HouseReadingsDevice
        style={{
          pointerEvents: disabled ? 'none' : undefined,
          cursor: disabled ? 'not-allowed' : undefined,
        }}
      >
        <div>{device.apartmentNumber}</div>

        <Column>
          <OwnerName>
            <Span>{device.homeownerName}</Span>
          </OwnerName>
          <div>{device.personalAccountNumber}</div>
        </Column>

        <IconContainer>
          <Icon className={styles.icon} icon={icon} fill={color} />
        </IconContainer>

        <Column>
          <div>
            <b>{device.serialNumber}</b>
          </div>
          <div>
            <Span>{device.model}</Span>
          </div>
        </Column>

        {previousReadings}
        {currentReadings}

        <div>{consumptionElems}</div>
        <div>-</div>

        <Flex style={{ minWidth: 80 }}>
          <HistoryIcon
            style={{ cursor: 'pointer' }}
            onClick={() => openReadingsHistoryModal(device.id)}
          />
        </Flex>
      </HouseReadingsDevice>
    );
  }
);

const HouseReadingsDevice = styled.div`
  display: grid;
  grid-template-columns:
    15px 100px 6px 130px 160px 160px 47px 115px
    minmax(0, 80px);
  column-gap: 16px;
  color: var(--main-90);
  border-bottom: 1px solid var(--frame);
  padding: 16px;
  align-items: baseline;
  min-height: 95px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  & div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const IconContainer = styled.div`
  position: relative;
  top: 5px;
`;

const OwnerName = styled.div`
  color: var(--main-100);
  font-weight: 500;
  font-size: 16px;
  text-overflow: ellipsis;
`;

const Consumption = styled.div`
  &:not(:last-child) {
    padding-bottom: 16px;
  }
`;

const Span = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type Props = {
  device: IndividualDeviceListItemResponse;
  numberOfPreviousReadingsInputs: number;
  sliderIndex: number;
  disabled?: boolean;
};
