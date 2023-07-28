import React, { FC } from 'react';
import { Props } from './SelectDistrictActionModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ListIcon, MapPaperIcon, PencilIcon } from 'ui-kit/icons';
import { ActionPanel } from 'ui-kit/shared/ActionPanel';
import { LinkPanel } from 'ui-kit/shared/LinkPanel';
import { SpaceLine } from 'ui-kit/SpaceLine';
import {
  ColorCircle,
  DeleteDistrictText,
  TitleWrapper,
  TrashIconSC,
} from './SelectDistrictActionModal.styled';
import { useUnit } from 'effector-react';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';

export const SelectDistrictActionModal: FC<Props> = ({
  isOpen,
  districtName,
  handleClose,
  fillColor,
  strokeColor,
  openDeleteDistrictModal,
}) => {
  const featureToggles = useUnit(
    developmentSettingsService.outputs.$featureToggles,
  );

  return (
    <FormModal
      title={
        <TitleWrapper>
          <ColorCircle fillColor={fillColor} strokeColor={strokeColor} />
          {districtName || ''}
        </TitleWrapper>
      }
      visible={isOpen}
      formId="select-district-action"
      onCancel={handleClose}
      form={
        <div>
          {featureToggles.districtManageActions && (
            <>
              <ActionPanel
                icon={<PencilIcon />}
                onClick={() => {}}
                text="Редактировать название и цвет района"
              />
              <LinkPanel
                icon={<ListIcon />}
                text="Изменить список объектов"
                link=""
              />
              <LinkPanel
                icon={<MapPaperIcon />}
                text="Изменить границы района на карте"
                link=""
              />
              <SpaceLine />
            </>
          )}
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
