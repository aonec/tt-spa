import React, { FC, useEffect, useState } from 'react';
import { HousingStockNumberProps } from './HousingStockNumber.types';
import { Checkbox } from 'antd';
import { HousingStockNumberWrapper, Number } from './HousingStockNumber.styled';

export const HousingStockNumber: FC<HousingStockNumberProps> = ({
  housingStock,
  setHousingStockIdsWithStreet,
  currentStreetCheckedHousingStockIds,
  checkedhousingStockIdsWithStreet,
  street,
}) => {
  const [isChecked, setCheck] = useState(false);

  const currentHousingStockId = housingStock.buildingId;

  useEffect(
    () =>
      setCheck(
        currentStreetCheckedHousingStockIds.some(
          (streetCheckedId) => streetCheckedId === currentHousingStockId,
        ),
      ),
    [currentHousingStockId, currentStreetCheckedHousingStockIds],
  );

  return (
    <HousingStockNumberWrapper
      onClick={() => {
        if (isChecked) {
          setHousingStockIdsWithStreet({
            street,
            housingStocksId: currentHousingStockId,
            isToAdd: false,
          });

          setCheck(false);
        } else {
          setHousingStockIdsWithStreet({
            street,
            housingStocksId: currentHousingStockId,
            isToAdd: true,
          });

          setCheck(true);
        }
      }}
    >
      <Checkbox checked={isChecked} />
      <Number isChecked={isChecked}>
        {housingStock.number} {housingStock.corpus}
      </Number>
    </HousingStockNumberWrapper>
  );
};
