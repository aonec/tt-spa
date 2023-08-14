import React, { FC, useState } from 'react';
import { GoBack } from 'ui-kit/shared/GoBack';
import { ControlButtonsWrapper, Header } from './ManageDistrictPage.styled';
import { DistrictsPageSegment, Props } from './ManageDistrictPage.types';
import { Segmented } from 'ui-kit/Segmented';
import { ListIcon, MapIcon } from 'ui-kit/icons';
import { ManageDistrictsMap } from './ManageDistrictsMap';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';
import { useHistory } from 'react-router-dom';

export const ManageDistrictPage: FC<Props> = ({
  existingDistricts,
  handleDeleteDistrict,
  organizationCoordinates,
}) => {
  const [districtsPageSegment, setDistrictsPageSegment] =
    useState<DistrictsPageSegment>('map');

  const history = useHistory();

  return (
    <div>
      <Header>
        <GoBack />
        <ControlButtonsWrapper>
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
          <ContextMenuButton
            size="small"
            menuButtons={[
              {
                title: 'Задать границы нового района на карте',
                onClick: () =>
                  history.push('/districtBordersSettings/createByMap'),
              },
              {
                title: 'Задать границы нового района по адресам',
                onClick: () =>
                  history.push(
                    '/districtBordersSettings/createByHousingStocksList',
                  ),
              },
            ]}
          />
        </ControlButtonsWrapper>
      </Header>
      {districtsPageSegment === 'list' && <>list</>}
      {districtsPageSegment === 'map' && (
        <ManageDistrictsMap
          existingDistricts={existingDistricts}
          organizationCoordinates={organizationCoordinates}
          handleDeleteDistrict={handleDeleteDistrict}
        />
      )}
    </div>
  );
};
