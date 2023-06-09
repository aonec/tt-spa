import React, { FC, useState } from 'react';
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
import _ from 'lodash';

export const AddressStreetGroup: FC<AddressStreetGroupProps> = ({
  address,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [checkedhousingStockIds, setHousingStockIds] = useState<number[]>([]);

  const [isChecked, setCheck] = useState(false);

  const housingStockIds =
    address.addresses?.map((address) => address.housingStockId) || [];

  return (
    <Wrapper>
      <GroupHeader onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <LeftBlock onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <Checkbox
            checked={isChecked}
            onChange={() => {
              if (isChecked) {
                setHousingStockIds((prev) =>
                  _.difference(prev, housingStockIds),
                );
                setCheck(false);
              } else {
                setHousingStockIds((prev) => [...prev, ...housingStockIds]);
                setCheck(true);
              }
            }}
          />
          <Street>ул. {address.street}</Street>
        </LeftBlock>

        <RightBlock>
          <SelectedAddressCount>
            {address.addresses?.length
              ? address.addresses?.length === checkedhousingStockIds.length
                ? 'Выбрано: Все'
                : `Выбрано: ${checkedhousingStockIds.length} `
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
              housingStockIds={checkedhousingStockIds}
              setHousingStockIds={setHousingStockIds}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
