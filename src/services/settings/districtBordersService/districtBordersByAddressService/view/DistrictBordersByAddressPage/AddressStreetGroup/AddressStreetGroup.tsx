import React, { FC, useEffect, useMemo, useState } from 'react';
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

export const AddressStreetGroup: FC<AddressStreetGroupProps> = ({
  address,
  checkedhousingStockIdsWithStreet,
  setHousingStockIdsWithStreet,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isChecked, setCheck] = useState(false);

  const street = address.street;

  const sortedAddresses = sortStickyBodyAddress(address.addresses);

  const housingStockIds = (address.addresses || [])
    .filter((elem) => !elem.isDistributed)
    .map((address) => address.buildingId);

  const isCheckable = useMemo(
    () =>
      (address.addresses || []).filter((elem) => !elem.isDistributed).length !==
      0,
    [address],
  );

  const currentStreetCheckedHousingStockIds =
    checkedhousingStockIdsWithStreet.find((data) => data.street === street)
      ?.housingStocksId || [];

  useEffect(() => {
    const isEqualIdsLength =
      housingStockIds.length === currentStreetCheckedHousingStockIds.length;
    if (
      isEqualIdsLength &&
      Boolean(currentStreetCheckedHousingStockIds.length)
    ) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [currentStreetCheckedHousingStockIds.length, housingStockIds.length]);

  const checkedHousesCountString = `Выбрано: ${
    isChecked ? 'Все' : currentStreetCheckedHousingStockIds.length
  } `;

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
              setHousingStockIdsWithStreet({
                street,
                housingStocksId: [],
                isToAdd: false,
              });
              setCheck(false);
            } else {
              setHousingStockIdsWithStreet({
                street,
                housingStocksId: housingStockIds,
                isToAdd: true,
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
              setHousingStockIdsWithStreet={setHousingStockIdsWithStreet}
              street={street}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
