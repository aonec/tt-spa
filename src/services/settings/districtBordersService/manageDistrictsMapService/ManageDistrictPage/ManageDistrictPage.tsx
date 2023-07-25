import React, { FC, useState } from 'react';
import { useForm } from 'effector-forms';
import { GoBack } from 'ui-kit/shared/GoBack';
import { Button } from 'ui-kit/Button';
import { manageDistrictsMapService } from '../manageDistrictsMapService.models';
import { ControlButtonsWrapper, Header } from './ManageDistrictPage.styled';
import { DistrictsPageSegment, Props } from './ManageDistrictPage.types';
import { Segmented } from 'ui-kit/Segmented';
import { ListIcon, MapIcon } from 'ui-kit/icons';
import { ManageDistrictsMap } from './ManageDistrictsMap';

const { forms } = manageDistrictsMapService;

export const ManageDistrictPage: FC<Props> = ({
  existingDistricts,
  handleDeleteDistrict,
  organizationCoordinates,
}) => {
  const [districtsPageSegment, setDistrictsPageSegment] =
    useState<DistrictsPageSegment>('list');

  const { fields } = useForm(forms.manageDistrictsForm);

  const setSelectedDistrictId = fields.selectedDistrictId.onChange;

  return (
    <div>
      <Header>
        <div>
          <GoBack />
        </div>
        <ControlButtonsWrapper>
          {fields.selectedDistrictId.value && (
            <Button
              onClick={() => fields.selectedDistrictId.onChange(null)}
              type="ghost"
              size="small"
            >
              Отмена
            </Button>
          )}
          <Segmented<DistrictsPageSegment>
            active={districtsPageSegment}
            items={[
              {
                title: 'Список',
                name: 'list',
                icon: <ListIcon />,
              },
              {
                title: 'На карте',
                name: 'map',
                icon: <MapIcon />,
              },
            ]}
            onChange={setDistrictsPageSegment}
          />
        </ControlButtonsWrapper>
      </Header>
      <ManageDistrictsMap
        existingDistricts={existingDistricts}
        setSelectedDistrictId={setSelectedDistrictId}
        selectedDistrictId={fields.selectedDistrictId.value}
        organizationCoordinates={organizationCoordinates}
      />
    </div>
  );
};
