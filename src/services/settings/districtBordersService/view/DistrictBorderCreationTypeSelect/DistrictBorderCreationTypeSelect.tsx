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
        link="/settings/districtBorder/map"
        icon={<MapIcon />}
      />
      <LinkPanel
        text="Задать границы районов по адресам"
        link="/settings/districtBorder/list"
        icon={<ListIcon />}
      />
    </Wrapper>
  );
};
