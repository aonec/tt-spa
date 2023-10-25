import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox } from 'antd';
import {
  ChevronSC,
  ChevronWrapper,
  GroupHeader,
  LeftBlock,
  RightBlock,
  SelectedAddressCount,
  Street,
  Wrapper,
} from './AddressStreetGroup.styled';
import { AddressStreetGroupProps } from './AddressStreetGroup.types';
import { HousingStockNumber } from './HousingStockNumber';
import { sortStickyBodyAddress } from './AddressStreetGroup.utils';
import { AddressShortResponse } from 'api/types';

export const AddressStreetGroup: FC<AddressStreetGroupProps> = ({
  address,
  checkedhousingStocksWithStreet,
  setHousingStocksWithStreet,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isChecked, setCheck] = useState(false);

  const street = address.street;

  const sortedAddresses = sortStickyBodyAddress(address.addresses);

  const housingStocks = (address.addresses || []).filter(
    (elem) => !elem.isDistributed,
  );

  const isCheckable = useMemo(
    () =>
      (address.addresses || []).filter((elem) => !elem.isDistributed).length !==
      0,
    [address],
  );

  const currentStreetCheckedHousingStockIds = (
    checkedhousingStocksWithStreet.find((data) => data.street === street)
      ?.addresses || []
  ).map((elem) => elem.buildingId);

  useEffect(() => {
    const isEqualIdsLength =
      housingStocks.length === currentStreetCheckedHousingStockIds.length;
    if (
      isEqualIdsLength &&
      Boolean(currentStreetCheckedHousingStockIds.length)
    ) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [currentStreetCheckedHousingStockIds.length, housingStocks.length]);

  const checkedHousesCountString = `Выбрано: ${
    isChecked ? 'Все' : currentStreetCheckedHousingStockIds.length
  } `;

  const handleSetAddress = useCallback(
    ({
      isToAdd,
      address,
    }: {
      isToAdd: boolean;
      address: AddressShortResponse;
    }) => {
      const allAddresses =
        checkedhousingStocksWithStreet.find((data) => data.street === street)
          ?.addresses || [];

      if (isToAdd) {
        return setHousingStocksWithStreet({
          street,
          addresses: [...allAddresses, address],
        });
      }
      setHousingStocksWithStreet({
        street,
        addresses: allAddresses.filter(
          (elem) => elem.buildingId !== address.buildingId,
        ),
      });
    },
    [checkedhousingStocksWithStreet, setHousingStocksWithStreet, street],
  );

  return (
    <Wrapper>
      <GroupHeader onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <LeftBlock
          isCheckable={!isCheckable}
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);

            if (!isCheckable) {
              return;
            }

            if (isChecked) {
              setHousingStocksWithStreet({
                street,
                addresses: [],
              });
              setCheck(false);
            } else {
              setHousingStocksWithStreet({
                street,
                addresses: housingStocks,
              });
              setCheck(true);
            }
          }}
        >
          <Checkbox
            checked={false}
            indeterminate={isChecked}
            disabled={!isCheckable}
          />
          <Street isChecked={isChecked}>ул. {address.street}</Street>
        </LeftBlock>

        <RightBlock>
          <SelectedAddressCount>
            {Boolean(sortedAddresses.length) && checkedHousesCountString}
          </SelectedAddressCount>

          <ChevronWrapper>
            <ChevronSC isOpen={isOpen} />
          </ChevronWrapper>
        </RightBlock>
      </GroupHeader>
      {isOpen && (
        <div>
          {sortedAddresses.map((housingStock) => (
            <HousingStockNumber
              key={housingStock.buildingId}
              housingStock={housingStock}
              currentStreetCheckedHousingStockIds={
                currentStreetCheckedHousingStockIds
              }
              setAddress={handleSetAddress}
              street={street}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
