import React, { FC } from 'react';
import { Wrapper } from './AccountingNodesReadings.styled';
import { AccountingNodesReadingsProps } from './AccountingNodesReadings.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
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

  return (
    <>
      <AddressSearchContainer
        fields={[
          SearchFieldType.City,
          SearchFieldType.Street,
          SearchFieldType.House,
        ]}
        handleSubmit={({ city, corpus, street, house }) => {
          const isAddressFull = city && street && house;

          if (isAddressFull) {
            return handleGetElectricNodes({
              'Address.City': city,
              'Address.HousingStockNumber': house,
              'Address.Street': street,
              'Address.Corpus': corpus,
            });
          }
        }}
        initialValues={
          address && {
            city: address.city || undefined,
            street: address.street || undefined,
            house: address.number || undefined,
          }
        }
        isError={!address && isElectricNodesFetched}
      />
      <WithLoader isLoading={isLoading}>
        <Wrapper>
          {!address && !isElectricNodesFetched && <TypeAddressToStart />}
          {!address && isElectricNodesFetched && <NothingFound />}
          {!electricNodesExist && address && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет приборов"
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
