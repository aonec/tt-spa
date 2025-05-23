import React, { FC, useEffect, useState } from 'react';
import { Wrapper } from './AccountingNodesReadings.styled';
import { AccountingNodesReadingsProps } from './AccountingNodesReadings.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import {
  AddressSearchValues,
  SearchFieldType,
} from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Empty } from 'antd';
import { TypeAddressToStart } from 'ui-kit/shared/TypeToStart';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { AccountingNodesList } from '../AccountingNodesList';
import { NothingFound } from 'ui-kit/shared/NothingFound';

export const AccountingNodesReadings: FC<AccountingNodesReadingsProps> = ({
  handleGetElectricNodes,
  address,
  electricNodes,
  isLoading,
  downSliderIndex,
  sliderIndex,
  upSliderIndex,
  sum,
  isElectricNodesFetched,
}) => {
  const electricNodesExist = electricNodes.length !== 0;

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
    <>
      <AddressSearchContainer
        fields={[
          SearchFieldType.City,
          SearchFieldType.Street,
          SearchFieldType.House,
          SearchFieldType.Corpus,
        ]}
        handleSubmit={({ city, corpus, street, house }) => {
          const isAddressFull = city && street && house;

          if (isAddressFull) {
            return handleGetElectricNodes({
              'Address.City': city,
              'Address.HousingStockNumber': house,
              'Address.Street': street,
              'Address.Corpus': corpus || undefined,
            });
          }
        }}
        initialValues={addressData}
        isError={!address && isElectricNodesFetched}
        isCityPreselected
      />
      <WithLoader isLoading={isLoading}>
        <Wrapper>
          {!address && !isElectricNodesFetched && <TypeAddressToStart />}
          {!address && isElectricNodesFetched && <NothingFound />}
          {!electricNodesExist && address && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет приборов"
              style={{ marginTop: '80px', fontSize: '22px' }}
            />
          )}
          {electricNodesExist && address && (
            <AccountingNodesList
              electricNodes={electricNodes}
              sliderIndex={sliderIndex}
              upSliderIndex={upSliderIndex}
              downSliderIndex={downSliderIndex}
              sum={sum}
            />
          )}
        </Wrapper>
      </WithLoader>
    </>
  );
};
