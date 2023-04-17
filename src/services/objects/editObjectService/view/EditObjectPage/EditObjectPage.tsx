import React, { FC, useState } from 'react';
import { CityWrappper, Edit, PageTitleAddress } from './EditObjectPage.styled';
import {
  EditObjectPageProps,
  EditObjectPageTabs,
} from './EditObjectPage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Tabs } from 'ui-kit/Tabs';
import { AdditionalInfoTab } from './AdditionalInfoTab';
import { AddressTab } from './AddressTab';
import { MainInfoTab } from './MainInfoTab';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';

export const EditObjectPage: FC<EditObjectPageProps> = ({
  housingStock,
  existingCities,
  existingStreets,
}) => {
  const [activeTab, setTab] = useState(EditObjectPageTabs.Address);

  const { address } = housingStock;
  const addressString = getHousingStockAddress(housingStock);
  const city = address?.mainAddress?.city || '';

  return (
    <>
      <GoBack />
      <PageTitleAddress>
        {addressString}. <Edit> Редактирование</Edit>
      </PageTitleAddress>
      <CityWrappper>{city}</CityWrappper>

      <Tabs
        onChange={(tab) => setTab(tab as EditObjectPageTabs)}
        activeKey={activeTab}
      >
        <Tabs.TabPane tab="Адрес объекта" key={EditObjectPageTabs.Address}>
          {housingStock.address && (
            <AddressTab
              address={housingStock.address}
              existingCities={existingCities}
              existingStreets={existingStreets}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Основная информация"
          key={EditObjectPageTabs.MainInfo}
        >
          <MainInfoTab />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Дополнительная информация"
          key={EditObjectPageTabs.AdditionalInfo}
        >
          <AdditionalInfoTab />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
