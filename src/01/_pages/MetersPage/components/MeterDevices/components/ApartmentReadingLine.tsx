import React, { useState } from 'react';
import { useReadings } from '../../../../../hooks/useReadings';
import { message, Tooltip } from 'antd';
import DeviceInfo from './DeviceInfo';
import {
  IndividualDeviceListItemResponse,
  ESecuredIdentityRoleName,
} from 'myApi';
import { ButtonTT, MenuButtonTT } from '01/tt-components';
import { useHistory, useParams } from 'react-router-dom';
import { closingIndividualDeviceButtonClicked } from '01/features/individualDevices/closeIndividualDevice/models';
import {
  Footer as ModalFooter,
  Header as ModalHeader,
  StyledModal as StyledAntdModal,
} from '01/shared/ui/Modal/Modal';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import confirm from 'antd/lib/modal/confirm';
import { reopenIndividualDevice } from '01/_api/individualDevices';
import { refetchIndividualDevices } from '01/features/individualDevices/displayIndividualDevices/models';
import { openReadingsHistoryModal } from '01/features/readings/displayReadingHistory/models';
import { useEvent, useStore } from 'effector-react';
import { $userRoleTypes } from '01/features/managementFirmUsers/displayCurrentUser/models';
import { deleteIndividualDeviceService } from '01/features/individualDevices/deleteIndividualDevice/deleteIndividualDeviceService.models';

import { FullDeviceLine } from './apartment_reading_line.styled';
import { HistoryIcon, StarIcon } from 'ui-kit/icons';
import { ActionButton } from './action_button/action_button';

interface ApartmentReadingLineProps {
  device: IndividualDeviceListItemResponse;
  sliderIndex: number;
  numberOfPreviousReadingsInputs: number;
  closed?: boolean;
}

const ApartmentReadingLine = ({
  device,
  sliderIndex,
  numberOfPreviousReadingsInputs,
  closed,
}: ApartmentReadingLineProps) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { readingsState, previousReadings, currentReadings } = useReadings(
    device,
    sliderIndex,
    numberOfPreviousReadingsInputs,
    closed
  );

  const userRoletypes = useStore($userRoleTypes);

  const isSeniorOperator =
    Boolean(userRoletypes) &&
    userRoletypes?.includes(ESecuredIdentityRoleName.SeniorOperator);

  const onDeleteIndividualDevice = useEvent(
    deleteIndividualDeviceService.inputs.deleteDeviceModalOpened
  );

  if (!readingsState) return null;

  const menuButtonArr = [
    {
      title: 'Редактировать',
      show: true,
      cb: () => history.push(`/individualDevices/${device.id}/edit`),
    },
    {
      title: 'Замена или поверка прибора',
      show: true,
      cb: () => setIsModalOpen(true),
    },
    {
      title: 'Открыть прибор',
      show: closed,
      cb: () =>
        confirm({
          title: `Вы действительно хотите открыть прибор ${device.model} (${device.serialNumber})?`,
          onOk: async () => {
            try {
              await reopenIndividualDevice(device.id);

              message.success('Прибор успешно переоткрыт');

              refetchIndividualDevices();
            } catch (error) {
              message.error('Не удалось открыть прибор');
            }
          },
          okText: 'Да',
          cancelText: 'Отмена',
        }),
    },
    {
      title: 'Закрытие прибора',
      show: !closed,
      color: 'red',
      cb: () => closingIndividualDeviceButtonClicked(device),
    },
    {
      title: 'Удалить прибор',
      show: isSeniorOperator,
      color: 'red',
      cb: () => onDeleteIndividualDevice(device),
    },
  ];

  return (
    <>
      <SelectSwitchDeiveTypeModal
        show={isModalOpen}
        close={() => setIsModalOpen(false)}
        deviceId={device.id}
      />
      <FullDeviceLine closed={closed}>
        <DeviceInfo device={device} />

        {previousReadings}
        {currentReadings}

        <Flex style={{ justifyContent: 'flex-end', width: '100%' }}>
          <Tooltip title="Переоткрытие прибора">
            <StarIcon
              style={{ cursor: 'pointer' }}
              onClick={() =>
                history.push(
                  `/apartment/${id}/individualDevice/${device.id}/reopen`
                )
              }
            />
          </Tooltip>
          <Space w={8} />
          <Tooltip title="История показаний">
            <HistoryIcon
              style={{ cursor: 'pointer' }}
              onClick={
                () => openReadingsHistoryModal(device.id)
                // history.push(
                //   `/apartment/${id}/individualDevice/${device.id}/readingHistory`
                // )
              }
            />
          </Tooltip>
          <Space />
          <MenuButtonTT menuButtonArr={menuButtonArr} size="small" />
        </Flex>
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
          <ButtonTT color={'white'} key="back" onClick={close}>
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
        <ActionButton
          onClick={setSwitchType('switch')}
          active={isSwitchActive('switch')}
          type="switch"
        />
        <ActionButton
          onClick={setSwitchType('check')}
          active={isSwitchActive('check')}
          type="check"
        />
      </Flex>
    </StyledAntdModal>
  );
};

export default ApartmentReadingLine;
