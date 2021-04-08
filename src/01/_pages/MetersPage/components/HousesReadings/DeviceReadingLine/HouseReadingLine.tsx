import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IndividualDeviceType } from '../../../../../../types/types';
import rateTypeToNumber from '../../../../../_api/utils/rateTypeToNumber';
import DeviceIcons from '../../../../../_components/DeviceIcons';
import { Icon } from '../../../../../_components/Icon';
import styles from '../../../../Devices/components/TabsDevices.module.scss';
import { useReadings } from '../../../../../hooks/useReadings';
import { isNullInArray } from '../../../../../utils/checkArrayForNulls';
import { ButtonTT } from '../../../../../tt-components';
import { Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { setInputUnfocused } from '01/Redux/ducks/readings/actionCreators';
import { v4 as uuid } from 'uuid';
import { IndividualDeviceListItemResponse } from '../../../../../../myApi';

export const HouseReadingLine: React.FC<Props> = React.memo(({ device }) => {
  const textInput = React.createRef<Input>();

  const {
    readingsState,
    isVisible,
    handleOk,
    handleCancel,
    previousReadings,
    currentReadings,
  } = useReadings(device, textInput);

  const dispatch = useDispatch();

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

      <StyledModal
        visible={isVisible}
        title={<Header>Вы действительно хотите уйти без сохранения?</Header>}
        onOk={handleOk}
        onCancel={handleCancel}
        // afterClose={afterCloseHandler}
        width={800}
        footer={
          <Footer>
            <ButtonTT color={'white'} key="back" onClick={handleCancel}>
              Отмена
            </ButtonTT>
            <ButtonTT color={'red'} key="submit" onClick={handleOk}>
              Выйти без сохранения
            </ButtonTT>
          </Footer>
        }
      >
        <ModalText>
          Вы внесли не все показания, если вы покинете страницу, то все
          изменения, которые были сделаны вами на этой странице не сохранятся
        </ModalText>
      </StyledModal>
    </HouseReadingsDevice>
  );
});

const HouseReadingsDevice = styled.div`
  display: grid;
  grid-template-columns:
    32px minmax(180px, 240px) 16px minmax(152px, 232px) minmax(120px, 160px)
    minmax(120px, 160px) 75px minmax(134px, 304px);
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
const ModalText = styled.p`
  color: var(--main-100);
  margin: 0;
`;

const Footer = styled.div`
  background-color: var(--bg);
  height: 96px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 32px;
  font-weight: 700;
`;

const Header = styled.h1`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 300;
  margin: 0;
`;

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 24px 32px;
    border: 0;
  }

  .ant-modal-body {
    padding: 0 32px 32px 32px;
  }

  .ant-modal-footer {
    padding: 0;
  }

  .ant-modal-close-x {
    fill: var(--main-100);
  }

  .ant-modal-footer button + button {
    margin-bottom: 0;
    margin-left: 16px;
  }
`;

const Span = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type Props = {
  device: IndividualDeviceListItemResponse;
};
