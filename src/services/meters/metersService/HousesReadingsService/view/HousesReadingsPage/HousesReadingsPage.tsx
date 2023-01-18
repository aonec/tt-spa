import React, { FC } from 'react';
import {
  IndividualDevicesListWrapper,
  Wrapper,
} from './HousesReadingsPage.styled';
import { HousesReadingsPageProps } from './HousesReadingsPage.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { TypeAddressToStart } from '01/shared/ui/TypeToStart';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { HousingStockInfoPanel } from './HousingStockInfoPanel';
import { IndividualDevicesList } from './IndividualDevicesList';
import { TopButton } from './IndividualDevicesList/TopButton';

export const HousesReadingsPage: FC<HousesReadingsPageProps> = ({
  housingStock,
  handleSearchHousingStock,
  isLoadingHousingStock,
  inspector,
  individualDevicesList,
  loadNextPageOfIndividualDevicesList,
  isLoadingIndividualDevices: isLoadingIndividualDevices,
  managementFirmConsumptionRates,
  openReadingsHistoryModal,
  isAllDevicesLoaded,
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
            HousingStockNumber: values.house,
          });
        }}
        initialValues={
          address && {
            city: address.city || undefined,
            street: address.street || undefined,
            house: address.number || undefined,
          }
        }
      />
      <WithLoader isLoading={isLoadingHousingStock}>
        {!housingStock && <TypeAddressToStart />}
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
