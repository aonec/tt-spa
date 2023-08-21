import React, { FC } from 'react';
import {
  IndividualDevicesListWrapper,
  Wrapper,
} from './HousesReadingsPage.styled';
import { HousesReadingsPageProps } from './HousesReadingsPage.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { HousingStockInfoPanel } from './HousingStockInfoPanel';
import { IndividualDevicesList } from './IndividualDevicesList';
import { TopButton } from './IndividualDevicesList/TopButton';
import { TypeAddressToStart } from 'ui-kit/shared/TypeToStart';
import { NothingFound } from 'ui-kit/shared/NothingFound';

export const HousesReadingsPage: FC<HousesReadingsPageProps> = ({
  housingStock,
  handleSearchHousingStock,
  isLoadingHousingStock,
  inspector,
  individualDevicesList,
  loadNextPageOfIndividualDevicesList,
  isLoadingIndividualDevices,
  managementFirmConsumptionRates,
  openReadingsHistoryModal,
  isAllDevicesLoaded,
  isHousingStockFetched,
}) => {
  const address = housingStock?.address?.mainAddress;

  return (
    <Wrapper>
      {Boolean(individualDevicesList.length) && <TopButton />}
      <AddressSearchContainer
        fields={[
          SearchFieldType.City,
          SearchFieldType.Street,
          SearchFieldType.House,
        ]}
        handleSubmit={(values) => {
          handleSearchHousingStock({
            City: values.city,
            Street: values.street,
            BuildingNumber: values.house,
          });
        }}
        initialValues={
          address && {
            city: address.city || undefined,
            street: address.street || undefined,
            house: address.number || undefined,
          }
        }
        isError={!housingStock && isHousingStockFetched}
      />
      <WithLoader isLoading={isLoadingHousingStock}>
        {!housingStock && !isHousingStockFetched && <TypeAddressToStart />}
        {!housingStock && isHousingStockFetched && <NothingFound />}
        {housingStock && (
          <>
            <HousingStockInfoPanel
              housingStock={housingStock}
              inspector={inspector}
            />
            <IndividualDevicesListWrapper>
              <IndividualDevicesList
                individualDevicesList={individualDevicesList}
                loadNextPageOfIndividualDevicesList={
                  loadNextPageOfIndividualDevicesList
                }
                isLoadingIndividualDevices={isLoadingIndividualDevices}
                managementFirmConsumptionRates={managementFirmConsumptionRates}
                openReadingsHistoryModal={openReadingsHistoryModal}
                isAllDevicesLoaded={isAllDevicesLoaded}
              />
            </IndividualDevicesListWrapper>
          </>
        )}
      </WithLoader>
    </Wrapper>
  );
};
