import React, { FC, useState } from 'react';
import { CityWrappper, Edit, PageTitleAddress } from './EditObjectPage.styled';
import {
  EditObjectPageProps,
  EditObjectPageTabs,
} from './EditObjectPage.types';
import { GoBack } from 'ui-kit/sharedComponents/GoBack';
import { Tabs } from 'ui-kit/Tabs';
import { AdditionalInfoTab } from './AdditionalInfoTab';
import { AddressTab } from './AddressTab';
import { MainInfoTab } from './MainInfoTab';
import { getBuildingAddress } from 'utils/getBuildingAddress';

export const EditObjectPage: FC<EditObjectPageProps> = ({
  housingStock,
  existingCities,
  existingStreets,
  houseManagements,
  openCreateHeatingStationModal,
  openEditHeatingStationModal,
  heatingStations,
  heatingStationCapture,
  onPageCancel,
  handleUpdateHousingStock,
  isHeatingStationsLoading,
  isHouseManagementsLoading,
  handleCreateHousingStockAddress,
  handleDeleteHousingStockAddress,
  handleUpdateHousingStockAddress,
  isCreateLoading,
  isUpdateLoading,
  handleRefetchHousingStock,
}) => {
  const [activeTab, setTab] = useState(EditObjectPageTabs.Address);

  const { address } = housingStock;
  const addressString = getBuildingAddress(housingStock);
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
              onPageCancel={onPageCancel}
              handleCreateHousingStockAddress={handleCreateHousingStockAddress}
              handleDeleteHousingStockAddress={handleDeleteHousingStockAddress}
              handleUpdateHousingStockAddress={handleUpdateHousingStockAddress}
              isUpdateLoading={isUpdateLoading}
              isCreateLoading={isCreateLoading}
              handleRefetchHousingStock={handleRefetchHousingStock}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Основная информация"
          key={EditObjectPageTabs.MainInfo}
        >
          <MainInfoTab
            housingStock={housingStock}
            houseManagements={houseManagements}
            openCreateHeatingStationModal={openCreateHeatingStationModal}
            openEditHeatingStationModal={openEditHeatingStationModal}
            heatingStations={heatingStations}
            heatingStationCapture={heatingStationCapture}
            onPageCancel={onPageCancel}
            handleUpdateHousingStock={handleUpdateHousingStock}
            isHeatingStationsLoading={isHeatingStationsLoading}
            isHouseManagementsLoading={isHouseManagementsLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Дополнительная информация"
          key={EditObjectPageTabs.AdditionalInfo}
        >
          <AdditionalInfoTab
            housingStock={housingStock}
            onPageCancel={onPageCancel}
            handleUpdateHousingStock={handleUpdateHousingStock}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
