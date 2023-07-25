import React, { FC } from 'react';
import { Wrapper } from './DistrictBorderCreationTypeSelect.styled';
import { DistrictBorderCreationTypeSelectProps } from './DistrictBorderCreationTypeSelect.types';
import { LinkPanel } from 'ui-kit/shared/LinkPanel';
import { ListIcon, MapIcon, MapPaperIcon } from 'ui-kit/icons';

export const DistrictBorderCreationTypeSelect: FC<
  DistrictBorderCreationTypeSelectProps
> = () => {
  return (
    <Wrapper>
      <LinkPanel
        text="Просмотреть районы на карте"
        link="/districtBordersSettings/manageDistricts"
        icon={<MapPaperIcon />}
      />
      <LinkPanel
        text="Задать границы районов на карте"
        link="/districtBordersSettings/createByMap"
        icon={<MapIcon />}
      />
      <LinkPanel
        text="Задать границы районов по адресам"
        link="/districtBordersSettings/createByHousingStocksList"
        icon={<ListIcon />}
      />
    </Wrapper>
  );
};
