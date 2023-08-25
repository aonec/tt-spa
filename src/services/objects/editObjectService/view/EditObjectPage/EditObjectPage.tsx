import React, { FC, useState } from 'react';
import { CityWrappper, Edit, PageTitleAddress } from './EditObjectPage.styled';
import {
  EditObjectPageProps,
  EditObjectPageTabs,
} from './EditObjectPage.types';
import { GoBack } from 'ui-kit/shared/GoBack';
import { Tabs } from 'ui-kit/Tabs';
import { AdditionalInfoTab } from './AdditionalInfoTab';
import { AddressTab } from './AddressTab';
import { MainInfoTab } from './MainInfoTab';
import { getBuildingAddress } from 'utils/getBuildingAddress';

export const EditObjectPage: FC<EditObjectPageProps> = ({
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
  houseCategory,
  housingStock,
  nonResidentialBuilding,
}) => {
  const [activeTab, setTab] = useState(EditObjectPageTabs.Address);

  const { address } = housingStock || nonResidentialBuilding || {};
  const addressString = getBuildingAddress(
    housingStock || nonResidentialBuilding,
  );
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
          {address && (
            <AddressTab
              address={address}
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
          {houseCategory && (
            <MainInfoTab
              housingStock={housingStock}
              nonResidentialBuilding={nonResidentialBuilding}
              houseManagements={houseManagements}
              openCreateHeatingStationModal={openCreateHeatingStationModal}
              openEditHeatingStationModal={openEditHeatingStationModal}
              heatingStations={heatingStations}
              heatingStationCapture={heatingStationCapture}
              onPageCancel={onPageCancel}
              handleUpdateHousingStock={handleUpdateHousingStock}
              isHeatingStationsLoading={isHeatingStationsLoading}
              isHouseManagementsLoading={isHouseManagementsLoading}
              houseCategory={houseCategory}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Дополнительная информация"
          key={EditObjectPageTabs.AdditionalInfo}
        >
          {houseCategory && (
            <AdditionalInfoTab
              housingStock={housingStock}
              nonResidentialBuilding={nonResidentialBuilding}
              onPageCancel={onPageCancel}
              handleUpdateHousingStock={handleUpdateHousingStock}
              houseCategory={houseCategory}
            />
          )}
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
