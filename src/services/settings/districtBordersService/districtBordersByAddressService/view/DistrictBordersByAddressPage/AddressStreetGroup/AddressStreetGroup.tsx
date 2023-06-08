import React, { FC, useEffect, useState } from 'react';
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

export const AddressStreetGroup: FC<AddressStreetGroupProps> = ({
  address,
  checkedhousingStockIdsWithStreet,
  setHousingStockIdsWithStreet,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isChecked, setCheck] = useState(false);

  const street = address.street;

  const housingStockIds =
    address.addresses?.map((address) => address.housingStockId) || [];

  const currentStreetCheckedHousingStockIds =
    checkedhousingStockIdsWithStreet.find((data) => data.street === street)
      ?.housingStocksId || [];


  useEffect(() => {
    if (
      housingStockIds?.length === currentStreetCheckedHousingStockIds.length
    ) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [currentStreetCheckedHousingStockIds.length, housingStockIds?.length]);

  return (
    <Wrapper>
      <GroupHeader onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <LeftBlock
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);

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
          <Checkbox checked={false} indeterminate={isChecked} />
          <Street isChecked={isChecked}>ул. {address.street}</Street>
        </LeftBlock>

        <RightBlock>
          <SelectedAddressCount>
            {address.addresses?.length
              ? isChecked
                ? 'Выбрано: Все'
                : `Выбрано: ${currentStreetCheckedHousingStockIds.length} `
              : ''}
          </SelectedAddressCount>

          <ChevronWrapper>
            <ChevronSC isOpen={isOpen} />
          </ChevronWrapper>
        </RightBlock>
      </GroupHeader>
      {isOpen && (
        <div>
          {address?.addresses?.map((housingStock) => (
            <HousingStockNumber
              key={housingStock.housingStockId}
              housingStock={housingStock}
              checkedhousingStockIdsWithStreet={
                checkedhousingStockIdsWithStreet
              }
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
