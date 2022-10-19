import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { ObjectProfileGrouptype } from '../../objectProfileService.constants';
import { CityWrappper, TabsSC, Wrapper } from './ObjectProfile.styled';
import { ObjectProfileProps } from './ObjectProfile.types';
const { TabPane } = TabsSC;

export const ObjectProfile: FC<ObjectProfileProps> = ({
  housingStock,
  currentGrouptype,
  setCurrentGrouptype,
}) => {
  const { address } = housingStock;
  const addressString = getHousingStockAddress(housingStock);
  const city = address?.mainAddress?.city || '';

  return (
    <Wrapper>
      <GoBack />
      <PageHeader title={`${addressString}`} />
      <CityWrappper>{city}</CityWrappper>
      <TabsSC
        onChange={(grouptype) =>
          setCurrentGrouptype(grouptype as ObjectProfileGrouptype)
        }
      >
        <TabPane
          tab="Общая информация"
          key={ObjectProfileGrouptype.Common}
        ></TabPane>
        <TabPane
          tab="Квартиры"
          key={ObjectProfileGrouptype.Apartments}
        ></TabPane>
        <TabPane
          tab="Системы учета ресурсов"
          key={ObjectProfileGrouptype.Devices}
        ></TabPane>
      </TabsSC>
    </Wrapper>
  );
};
