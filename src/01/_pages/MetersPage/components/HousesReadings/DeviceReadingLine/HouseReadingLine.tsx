import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import rateTypeToNumber from '../../../../../_api/utils/rateTypeToNumber';
import DeviceIcons from '../../../../../_components/DeviceIcons';
import { Icon } from '../../../../../_components/Icon';
import styles from '../../../../Devices/components/TabsDevices.module.scss';
import { useReadings } from '../../../../../hooks/useReadings';
import { isNullInArray } from '../../../../../utils/checkArrayForNulls';
import { useDispatch } from 'react-redux';
import { setInputUnfocused } from '01/Redux/ducks/readings/actionCreators';
import { v4 as uuid } from 'uuid';
import { IndividualDeviceListItemResponse } from '../../../../../../myApi';
import { MenuButtonTT } from '01/tt-components';
import { useHistory } from 'react-router-dom';

export const HouseReadingLine: React.FC<Props> = React.memo(
  ({ device, numberOfPreviousReadingsInputs }) => {
    const { readingsState, previousReadings, currentReadings } = useReadings(
      device,
      undefined,
      numberOfPreviousReadingsInputs
    );

    const dispatch = useDispatch();
    const history = useHistory();

    const [consumptionState, setConsumptionState] = useState<number[]>([]);

    const numberOfReadings: number = rateTypeToNumber(device.rateType);

    //useConsumption
    useEffect(() => {
      if (!readingsState) return;
      const currentReadings = readingsState?.currentReadingsArray || {};
      const previousReadings = readingsState?.previousReadingsArray || {};
      let consumptionArray = Array.from(
        { length: numberOfReadings },
        (v, i) => i
      );
      const consumption = consumptionArray.map((value, index) => {
        return +currentReadings[index] - +previousReadings[index] > 0
          ? +currentReadings[index] - +previousReadings[index]
          : 0;
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
      return <Consumption key={uuid()}>{el} кВтч</Consumption>;
    });

    const { icon, color } = DeviceIcons[device.resource];

    return (
      <HouseReadingsDevice>
        <div>
          <Span>{device.apartmentNumber}</Span>
        </div>
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
            <Span>{device.model}</Span>
          </div>
          <div>{device.serialNumber}</div>
        </Column>

        {previousReadings}
        {currentReadings}

        <div>{consumptionElems}</div>
        <div>-</div>

        <MenuButtonTT
          menuButtonArr={[
            {
              title: 'Открыть историю показаний',
              cb: () =>
                history.push(
                  `/houses/individualDevice/${device.id}/readingHistory`
                ),
              show: true,
            },
          ]}
        />
      </HouseReadingsDevice>
    );
  }
);

const HouseReadingsDevice = styled.div`
  display: grid;
  grid-template-columns: 10px minmax(130px, 160px) 1px minmax(110px, 150px) minmax(
      140px,
      180px
    ) minmax(140px, 180px) 75px minmax(134px, 304px) 32px;
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
};
