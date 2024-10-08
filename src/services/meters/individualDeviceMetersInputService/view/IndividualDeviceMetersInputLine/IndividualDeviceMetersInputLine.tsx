import { FC, useMemo, useState } from 'react';
import { useUnit } from 'effector-react';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
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
import { editReadingsHistoryService } from 'services/meters/editReadingsHistoryService';
import { SelectSwitchDeviceTypeModal } from './SelectSwitchDeviceTypeModal';
import { IndividualDeviceInfoExtended } from 'ui-kit/shared/IndividualDeviceInfoExtended';
import { currentUserService } from 'services/currentUser/currentUserService';
import {
  ContextMenuButtonColor,
  ContextMenuElement,
} from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import { closeIndividualDeviceService } from 'services/devices/individualDevices/closeIndividualDeviceService';
import { openIndividualDeviceService } from 'services/devices/individualDevices/openIndividualDevice/openIndividualDeviceService.models';

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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    managementFirmUser,
    onDeleteIndividualDevice,
    openCloseIndividualDeviceModal,
    openEditReadingsHistoryModal,
    handleOpenDevice,
  } = useUnit({
    onDeleteIndividualDevice: deleteIndividualDeviceService.inputs.openModal,
    openEditReadingsHistoryModal: editReadingsHistoryService.inputs.openModal,
    openCloseIndividualDeviceModal:
      closeIndividualDeviceService.inputs.openModal,
    managementFirmUser: currentUserService.outputs.$currentUser,
    handleOpenDevice: openIndividualDeviceService.inputs.openModal,
  });

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
        onClick: () => navigate(`/individualDevices/${device.id}/edit`),
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
        onClick: () => handleOpenDevice(device),
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
      isDeviceClosed,
      isSeniorOperator,
      navigate,
      device,
      openEditReadingsHistoryModal,
      handleOpenDevice,
      openCloseIndividualDeviceModal,
      onDeleteIndividualDevice,
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
              navigate(
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
