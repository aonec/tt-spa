import React, { FC } from 'react';
import { Wrapper } from './DistrictBorderCreationTypeSelect.styled';
import { DistrictBorderCreationTypeSelectProps } from './DistrictBorderCreationTypeSelect.types';
import { LinkPanel } from 'ui-kit/shared_components/LinkPanel';
import { ListIcon, MapIcon } from 'ui-kit/icons';

export const DistrictBorderCreationTypeSelect: FC<
  DistrictBorderCreationTypeSelectProps
> = () => {
  return (
    <Wrapper>
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
