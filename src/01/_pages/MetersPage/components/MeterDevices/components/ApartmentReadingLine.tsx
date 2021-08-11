import React from 'react';
import styled from 'styled-components';
import { useReadings } from '../../../../../hooks/useReadings';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import DeviceInfo from './DeviceInfo';
import {
  IndividualDeviceListItemResponse,
  EResourceType,
} from '../../../../../../myApi';
import { MenuButtonTT } from '01/tt-components';
import { useHistory } from 'react-router-dom';
import { closingIndividualDeviceButtonClicked } from '01/features/individualDevices/closeIndividualDevice/models';

interface ApartmentReadingLineProps {
  device: IndividualDeviceListItemResponse;
  sliderIndex: number;
  lineIndex?: number;
}

const ApartmentReadingLine = ({
  device,
  sliderIndex,
  lineIndex,
}: ApartmentReadingLineProps) => {
  const history = useHistory();

  const { readingsState, previousReadings, currentReadings } = useReadings(
    device,
    sliderIndex,
    lineIndex
  );

  if (!readingsState) return null;

  const menuButtonArr = [
    {
      title: 'Редактировать',
      show: true,
      cb: () => history.push(`/individualDevices/${device.id}/edit`),
    },
    {
      title: 'Закрытие прибора',
      show: true,
      color: 'red',
      cb: () => closingIndividualDeviceButtonClicked(device),
    },
  ];

  return (
    <>
      <FullDeviceLine>
        <DeviceInfo device={device} />

        {/*Инпуты с показаниями*/}

        {previousReadings}
        {currentReadings}

        <div></div>

        <MenuButtonTT menuButtonArr={menuButtonArr} size="small" />
      </FullDeviceLine>
    </>
  );
};

const FullDeviceLine = styled.div`
  display: grid;
  grid-template-columns: minmax(330px, 5.5fr) 2.25fr 2.25fr 1fr 0fr;
  column-gap: 16px;
  margin-top: 8px;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
  padding: 8px 8px 16px;
  border-bottom: 1px solid #dcdee4;
`;

export const getInputColor = (resource: EResourceType) => {
  switch (resource) {
    case 'HotWaterSupply':
      return '#FF8C68';
    case 'ColdWaterSupply':
      return '#79AFFF';
    case 'Heat':
      return 'Отопление';
    case 'Electricity':
      return '#E2B104';
  }
};

export const DeviceReadingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.color ? props.color : 'var(--main-90)')};
  border-left-width: 4px;
  max-width: 200px;
  padding: 8px 8px 8px 12px;

  &:focus-within {
    box-shadow: var(--shadow);
  }

  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    box-shadow: none;
  }
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

export default ApartmentReadingLine;
