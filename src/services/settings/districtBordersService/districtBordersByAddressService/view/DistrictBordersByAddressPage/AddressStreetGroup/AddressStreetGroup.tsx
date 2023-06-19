import React, { FC, useEffect, useMemo, useState } from 'react';
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
import { Checkbox } from 'antd';

export const AddressStreetGroup: FC<AddressStreetGroupProps> = ({
  address,
  checkedhousingStockIds,
  setHousingStockIds,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isChecked, setCheck] = useState(false);

  const street = address.street;

  const housingStockIds =
    address.addresses?.map((address) => address.housingStockId) || [];

  const currentStreetCheckedHousingStockIds = useMemo(
    () =>
      checkedhousingStockIds.find((data) => data.street === street)
        ?.housingStocksId || [],
    [checkedhousingStockIds, street],
  );

  useEffect(() => {
    if (
      housingStockIds?.length === currentStreetCheckedHousingStockIds.length
    ) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [currentStreetCheckedHousingStockIds, housingStockIds?.length]);

  return (
    <Wrapper>
      <GroupHeader onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <LeftBlock
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);

            if (isChecked) {
              setHousingStockIds(
                checkedhousingStockIds.map((housingStock) => {
                  return housingStock.street !== street
                    ? housingStock
                    : { ...housingStock, housingStocksId: [] };
                }),
              );
              setCheck(false);
            } else {
              setHousingStockIds(
                checkedhousingStockIds.map((housingStock) => {
                  return housingStock.street !== street
                    ? housingStock
                    : {
                        ...housingStock,
                        housingStocksId: [...housingStockIds],
                      };
                }),
              );
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
              checkedhousingStockIds={checkedhousingStockIds}
              currentStreetCheckedHousingStockIds={
                currentStreetCheckedHousingStockIds
              }
              setHousingStockIds={setHousingStockIds}
              street={street}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
