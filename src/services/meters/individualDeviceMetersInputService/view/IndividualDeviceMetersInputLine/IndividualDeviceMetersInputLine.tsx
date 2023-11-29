import React, { FC, useMemo, useState } from 'react';
import { useEvent, useStore } from 'effector-react';
import { message, Tooltip } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import {  useNavigate } from 'react-router-dom';
import { ESecuredIdentityRoleName } from 'api/types';
import { HistoryIcon, StarIcon } from 'ui-kit/icons';
import { deleteIndividualDeviceService } from 'services/devices/individualDevices/deleteIndividualDevice/deleteIndividualDeviceService.models';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { getMeasurementUnit } from '../../individualDeviceMetersInputService.utils';
import { MetersInputsBlock } from '../MetersInputsBlock';
import { getRateNum } from '../MetersInputsBlock/MetersInputsBlock.utils';
import {
  DeviceOptionsWrapper,
  Wrapper,
} from './IndividualDeviceMetersInputLine.styled';
import { IndividualDeviceMetersInputLineProps } from './IndividualDeviceMetersInputLine.types';
import { getPreviousMeterTooltipTitle } from './individualDeviceMetersInputLine.utils';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import { editReadingsHistoryService } from 'services/meters/editReadingsHistoryService';
import { SelectSwitchDeviceTypeModal } from './SelectSwitchDeviceTypeModal';
import { IndividualDeviceInfoExtended } from 'ui-kit/shared/IndividualDeviceInfoExtended';
import { currentUserService } from 'services/currentUserService';
import {
  ContextMenuButtonColor,
  ContextMenuElement,
} from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import { closeIndividualDeviceService } from 'services/devices/individualDevices/closeIndividualDeviceService';
import { reopenIndividualDevice } from '../../individualDeviceMetersInputService.api';

export const IndividualDeviceMetersInputLine: FC<
  IndividualDeviceMetersInputLineProps
> = ({
  device,
  sliderIndex,
  openReadingsHistoryModal,
  previousReading,
  currentReading,
  inputIndex,
  handleUploadReading,
  uploadingMetersStatuses,
  previousReadingByCurrentSliderIndex,
  editable = true,
  apartmentId,
  style,
}) => {
  const history =  useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDeleteIndividualDevice = useEvent(
    deleteIndividualDeviceService.inputs.openModal,
  );

  const openEditReadingsHistoryModal = useEvent(
    editReadingsHistoryService.inputs.openModal,
  );
  const openCloseIndividualDeviceModal = useEvent(
    closeIndividualDeviceService.inputs.openModal,
  );

  const managementFirmUser = useStore(currentUserService.outputs.$currentUser);

  const isDeviceClosed = Boolean(device.closingDate);

  const isSeniorOperator = useMemo(
    () =>
      Boolean(managementFirmUser?.roles) &&
      Boolean(
        managementFirmUser?.roles?.find(
          (elem) => elem.key === ESecuredIdentityRoleName.SeniorOperator,
        ),
      ),
    [managementFirmUser],
  );

  const menuButtonArr: ContextMenuElement[] = useMemo(
    () => [
      {
        title: 'Редактировать',
        onClick: () =>  history(`/individualDevices/${device.id}/edit`),
      },
      {
        title: 'Замена или поверка прибора',
        onClick: () => setIsModalOpen(true),
      },
      {
        title: 'Ввести показание за произвольный период',
        onClick: () => openEditReadingsHistoryModal(device),
      },
      {
        title: 'Открыть прибор',
        hidden: !isDeviceClosed,
        onClick: () =>
          confirm({
            title: `Вы действительно хотите открыть прибор ${device.model} (${device.serialNumber})?`,
            onOk: async () => {
              try {
                await reopenIndividualDevice(device.id);

                message.success('Прибор успешно переоткрыт');

                apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices();
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
        hidden: isDeviceClosed,
        color: ContextMenuButtonColor.danger,
        onClick: () => openCloseIndividualDeviceModal(device),
      },
      {
        title: 'Удалить прибор',
        hidden: !isSeniorOperator,
        color: ContextMenuButtonColor.danger,
        onClick: () => onDeleteIndividualDevice(device),
      },
    ],
    [
      device,
      isSeniorOperator,
      history,
      onDeleteIndividualDevice,
      isDeviceClosed,
      openEditReadingsHistoryModal,
      openCloseIndividualDeviceModal,
    ],
  );

  const previousReadingTooltipTitle = useMemo(
    () =>
      previousReadingByCurrentSliderIndex &&
      getPreviousMeterTooltipTitle(
        previousReadingByCurrentSliderIndex,
        getRateNum(device.rateType),
        getMeasurementUnit(device.resource),
      ),
    [previousReadingByCurrentSliderIndex, device],
  );

  return (
    <Wrapper isDeviceClosed={isDeviceClosed} style={style}>
      <SelectSwitchDeviceTypeModal
        apartmentId={apartmentId}
        show={isModalOpen}
        close={() => setIsModalOpen(false)}
        deviceId={device.id}
      />
      <IndividualDeviceInfoExtended device={device} />
      <MetersInputsBlock
        handleUploadReading={handleUploadReading}
        reading={previousReading}
        rateType={device.rateType}
        sliderIndex={sliderIndex}
        isPrevious
        inputIndex={inputIndex}
        isDisabled={isDeviceClosed || !editable}
        status={uploadingMetersStatuses[sliderIndex]}
        tooltip={(!previousReading && previousReadingTooltipTitle) || ''}
      />
      <MetersInputsBlock
        handleUploadReading={handleUploadReading}
        reading={currentReading}
        rateType={device.rateType}
        resource={device.resource}
        sliderIndex={-1}
        inputIndex={inputIndex}
        isDisabled={isDeviceClosed || !editable}
        status={uploadingMetersStatuses[-1]}
        tooltip={
          (!previousReading &&
            !currentReading &&
            previousReadingTooltipTitle) ||
          ''
        }
      />
      <DeviceOptionsWrapper>
        {editable && (
          <StarIcon
            onClick={() =>
               history(
                `/apartment/${apartmentId}/individualDevice/${device.id}/reopen`,
              )
            }
            style={{ cursor: 'pointer' }}
            className="device-option"
          />
        )}
        <Tooltip title="История показаний" className="device-option">
          <HistoryIcon
            onClick={openReadingsHistoryModal}
            style={{ cursor: 'pointer' }}
          />
        </Tooltip>
        {editable && (
          <div className="device-option">
            <ContextMenuButton menuButtons={menuButtonArr} size="small" />
          </div>
        )}
      </DeviceOptionsWrapper>
    </Wrapper>
  );
};
