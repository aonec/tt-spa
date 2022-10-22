import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { ResourceAccountingSystemsContainer } from 'services/devices/resourceAccountingSystemsService';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { ApartmentsListContainer } from '../../apartmentsListService';
import { ObjectProfileGrouptype } from '../../objectProfileService.constants';
import { ObjectInfo } from '../ObjectInfo';
import { CityWrappper, TabsSC } from './ObjectProfile.styled';
import { ObjectProfileProps } from './ObjectProfile.types';
import {RedirectToTasksContainer} from "./redirectToTasks";
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
    <div>
      <GoBack />
      <PageHeader title={`${addressString}`} />
      <CityWrappper>{city}</CityWrappper>

      <TabsSC
        onChange={(grouptype) =>
          setCurrentGrouptype(grouptype as ObjectProfileGrouptype)
        }
        activeKey={currentGrouptype}
      >
        <TabPane tab="Общая информация" key={ObjectProfileGrouptype.Common}>
          <ObjectInfo housingStock={housingStock} />
          <RedirectToTasksContainer />
        </TabPane>
        <TabPane tab="Квартиры" key={ObjectProfileGrouptype.Apartments}>
          <ApartmentsListContainer />
          <RedirectToTasksContainer />
        </TabPane>
        <TabPane
          tab="Системы учета ресурсов"
          key={ObjectProfileGrouptype.Devices}
        >
          <ResourceAccountingSystemsContainer />
          <RedirectToTasksContainer />
        </TabPane>
      </TabsSC>
    </div>
  );
};
