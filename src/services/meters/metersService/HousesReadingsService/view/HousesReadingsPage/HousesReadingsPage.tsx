import React, { FC, useEffect, useState } from 'react';
import {
  IndividualDevicesListWrapper,
  Wrapper,
} from './HousesReadingsPage.styled';
import { HousesReadingsPageProps } from './HousesReadingsPage.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import {
  AddressSearchValues,
  SearchFieldType,
} from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
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
  totalItems,
}) => {
  const address = housingStock?.address?.mainAddress;

  const [addressData, setAddressData] = useState<AddressSearchValues>({
    city: address?.city || null,
    street: address?.street || null,
    house: address?.number || null,
    corpus: address?.corpus || null,
  });

  useEffect(() => {
    if (!address) return;

    setAddressData({
      city: address.city,
      street: address.street,
      house: address.number,
      corpus: address.corpus,
    });
  }, [address]);

  return (
    <Wrapper>
      {Boolean(individualDevicesList.length) && <TopButton />}
      <AddressSearchContainer
        fields={[
          SearchFieldType.City,
          SearchFieldType.Street,
          SearchFieldType.House,
          SearchFieldType.Corpus,
        ]}
        handleSubmit={(values) => {
          handleSearchHousingStock({
            City: values.city || undefined,
            Street: values.street || undefined,
            BuildingNumber: values.house || undefined,
            Corpus: values.corpus || undefined,
          });
        }}
        initialValues={addressData}
        isError={!housingStock && isHousingStockFetched}
        isCityPreselected
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
                totalItems={totalItems}
              />
            </IndividualDevicesListWrapper>
          </>
        )}
      </WithLoader>
    </Wrapper>
  );
};
