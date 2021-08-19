import React, { useState } from 'react';
import styled from 'styled-components';
import { useReadings } from '../../../../../hooks/useReadings';
import { Modal } from 'antd';
import DeviceInfo from './DeviceInfo';
import {
  IndividualDeviceListItemResponse,
  EResourceType,
} from '../../../../../../myApi';
import { ButtonTT, MenuButtonTT } from '01/tt-components';
import { useHistory, useParams } from 'react-router-dom';
import { closingIndividualDeviceButtonClicked } from '01/features/individualDevices/closeIndividualDevice/models';
import {
  Footer as ModalFooter,
  Header as ModalHeader,
  StyledModal as StyledAntdModal,
} from '01/shared/ui/Modal/Modal';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ReactComponent as SwitchIcon } from './icons/switch.svg';
import { ReactComponent as CheckIcon } from './icons/check.svg';
import { Space } from '01/shared/ui/Layout/Space/Space';

interface ApartmentReadingLineProps {
  device: IndividualDeviceListItemResponse;
  sliderIndex: number;
  numberOfPreviousReadingsInputs: number;
}

const ApartmentReadingLine = ({
  device,
  sliderIndex,
  numberOfPreviousReadingsInputs,
}: ApartmentReadingLineProps) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { readingsState, previousReadings, currentReadings } = useReadings(
    device,
    sliderIndex,
    numberOfPreviousReadingsInputs
  );

  if (!readingsState) return null;

  const menuButtonArr = [
    {
      title: 'Редактировать',
      show: true,
      cb: () => history.push(`/individualDevices/${device.id}/edit`),
    },
    {
      title: 'Открыть историю показаний',
      show: true,
      cb: () =>
        history.push(
          `/apartment/${id}/individualDevice/${device.id}/readingHistory`
        ),
    },
    {
      title: 'Замена или поверка прибора',
      show: true,
      cb: () => setIsModalOpen(true),
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
      <SelectSwitchDeiveTypeModal
        show={isModalOpen}
        close={() => setIsModalOpen(false)}
        deviceId={device.id}
      />
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

type SwitchType = 'switch' | 'check';

const SelectSwitchDeiveTypeModal = ({
  show,
  close,
  deviceId,
}: {
  show: boolean;
  deviceId: number;
  close(): void;
}) => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const [
    selectedSwitchType,
    setSelectedSwitchType,
  ] = useState<SwitchType | null>(null);

  const next = (to: SwitchType) => () =>
    history.push(`/apartment/${id}/individualDevice/${deviceId}/${to}`);

  const setSwitchType = (to: SwitchType) => () =>
    to === selectedSwitchType
      ? setSelectedSwitchType(null)
      : setSelectedSwitchType(to);

  const isSwitchActive = (to: SwitchType) => to === selectedSwitchType;

  return (
    <StyledAntdModal
      width={800}
      visible={show}
      onCancel={close}
      title={<ModalHeader>Выберите действие</ModalHeader>}
      footer={
        <ModalFooter>
          <ButtonTT color={'white'} key="back">
            Отмена
          </ButtonTT>
          <ButtonTT
            color="blue"
            key="submit"
            disabled={!selectedSwitchType}
            onClick={next(selectedSwitchType!)}
          >
            Далее
          </ButtonTT>
        </ModalFooter>
      }
    >
      <Flex>
        <SwitchTypeButton
          onClick={setSwitchType('switch')}
          active={isSwitchActive('switch')}
        >
          <SwitchIcon />
          <Space />
          Замена прибора
        </SwitchTypeButton>
        <SwitchTypeButton
          onClick={setSwitchType('check')}
          active={isSwitchActive('check')}
        >
          <CheckIcon />
          <Space />
          Поверка прибора
        </SwitchTypeButton>
      </Flex>
    </StyledAntdModal>
  );
};

interface SwitchTypeButtonProps {
  active?: boolean;
}

const SwitchTypeButton = styled(Flex)`
  border: 1px solid #dcdee4;
  border-radius: 8px;
  width: 100%;
  transition: 0.3s;
  padding: 16px 0;
  justify-content: center;
  cursor: pointer;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 500;
  color: #272f5aee;

  &:last-child {
    margin-right: 0;
  }

  ${(props: SwitchTypeButtonProps) =>
    props.active
      ? `{
    border-color: #189ee9;
    box-shadow: 0 4px 8px 0 #189ee955;
  }`
      : ''}

  &:hover {
    border-color: #189ee9;
  }
`;

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
