import React, { FC, useMemo, useState } from 'react';
import { useEvent, useStore } from 'effector-react';
import { message, Tooltip } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { useHistory } from 'react-router-dom';
import { ESecuredIdentityRoleName } from 'myApi';
import { HistoryIcon, StarIcon } from 'ui-kit/icons';
import { closingIndividualDeviceButtonClicked } from '01/features/individualDevices/closeIndividualDevice/models';
import { deleteIndividualDeviceService } from '01/features/individualDevices/deleteIndividualDevice/deleteIndividualDeviceService.models';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { reopenIndividualDevice } from '01/_api/individualDevices';
import { getMeasurementUnit } from '../../individualDeviceMetersInputService.utils';
import { MetersInputsBlock } from '../MetersInputsBlock';
import { getRateNum } from '../MetersInputsBlock/MetersInputsBlock.utils';
import {
  DeviceOptionsWrapper,
  Wrapper,
} from './IndividualDeviceMetersInputLine.styled';
import { IndividualDeviceMetersInputLineProps } from './IndividualDeviceMetersInputLine.types';
import { getPreviousMeterTooltipTitle } from './individualDeviceMetersInputLine.utils';
import { ContextMenuElement, Color } from '01/shared/ui/ContextMenuButton';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import { editReadingsHistoryService } from 'services/meters/editReadingsHistoryService';
import { SelectSwitchDeviceTypeModal } from './SelectSwitchDeviceTypeModal';
import { IndividualDeviceInfoExtended } from 'ui-kit/shared_components/IndividualDeviceInfoExtended';
import { currentUserService } from 'services/currentUserService';

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
}) => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDeleteIndividualDevice = useEvent(
    deleteIndividualDeviceService.inputs.deleteDeviceModalOpened,
  );

  const openEditReadingsHistoryModal = useEvent(
    editReadingsHistoryService.inputs.openModal,
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
        onClick: () => history.push(`/individualDevices/${device.id}/edit`),
      },
      {
        title: 'Замена или поверка прибора',
        onClick: () => setIsModalOpen(true),
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
        color: Color.danger,
        onClick: () => closingIndividualDeviceButtonClicked(device),
      },
      {
        title: 'Удалить прибор',
        hidden: !isSeniorOperator,
        color: Color.danger,
        onClick: () => onDeleteIndividualDevice(device),
      },
      {
        title: 'Ввести показание за произвольный период',
        onClick: () => openEditReadingsHistoryModal(device),
      },
    ],
    [
      device,
      isSeniorOperator,
      history,
      onDeleteIndividualDevice,
      isDeviceClosed,
      openEditReadingsHistoryModal,
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
    <Wrapper isDeviceClosed={isDeviceClosed}>
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
              history.push(
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
