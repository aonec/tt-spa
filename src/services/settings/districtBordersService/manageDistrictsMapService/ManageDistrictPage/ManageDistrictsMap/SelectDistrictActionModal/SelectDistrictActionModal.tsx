import React, { FC, useMemo } from 'react';
import { Props } from './SelectDistrictActionModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { MapPaperIcon, PencilIcon } from 'ui-kit/icons';
import { ActionPanel } from 'ui-kit/shared/ActionPanel';
import { LinkPanel } from 'ui-kit/shared/LinkPanel';
import { SpaceLine } from 'ui-kit/SpaceLine';
import {
  ColorCircle,
  DeleteDistrictText,
  TitleWrapper,
  TrashIconSC,
} from './SelectDistrictActionModal.styled';
import { getDistrictColor } from 'utils/getDistrictColor';

export const SelectDistrictActionModal: FC<Props> = ({
  isOpen,
  handleClose,
  districtData,
  openDeleteDistrictModal,
  openEditDistrictModal,
}) => {
  const selectedDistrictColors = useMemo(
    () => getDistrictColor(districtData.type),
    [districtData.type],
  );

  return (
    <FormModal
      title={
        <TitleWrapper>
          {selectedDistrictColors && (
            <ColorCircle
              fillColor={selectedDistrictColors.color}
              strokeColor={selectedDistrictColors.strokeColor}
            />
          )}
          {districtData.name}
        </TitleWrapper>
      }
      visible={isOpen}
      formId="select-district-action"
      onCancel={handleClose}
      form={
        <div>
          <ActionPanel
            icon={<PencilIcon />}
            onClick={openEditDistrictModal}
            text="Редактировать название и цвет района"
          />
          {/* <LinkPanel
            icon={<ListIcon />}
            text="Изменить список объектов"
            link=""
          /> */}
          <LinkPanel
            icon={<MapPaperIcon />}
            text="Изменить границы района на карте"
            link={`/districtBordersSettings/editDistrictBorders/${districtData.id}`}
          />
          <SpaceLine />
          <ActionPanel
            icon={<TrashIconSC />}
            text={<DeleteDistrictText>Удалить район</DeleteDistrictText>}
            onClick={openDeleteDistrictModal}
          />
        </div>
      }
      customFooter={<></>}
      innerModalProps={{ width: 600 }}
    />
  );
};
