import React, { FC, useEffect, useState } from 'react';
import { HousingStockNumberProps } from './HousingStockNumber.types';
import { Checkbox } from 'antd';
import { HousingStockNumberWrapper, Number } from './HousingStockNumber.styled';

export const HousingStockNumber: FC<HousingStockNumberProps> = ({
  housingStock,
  setHousingStockIdsWithStreet,
  currentStreetCheckedHousingStockIds,
  street,
}) => {
  const [isChecked, setCheck] = useState(false);

  const { buildingId: currentHousingStockId, isDistributed } = housingStock;

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
      isDistributed={isDistributed}
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
      <Checkbox checked={isChecked} disabled={isDistributed} />
      <Number isChecked={isChecked}>
        {housingStock.number} {housingStock.corpus}
      </Number>
    </HousingStockNumberWrapper>
  );
};
