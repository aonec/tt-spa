import React, { FC, useEffect, useState } from 'react';
import { HousingStockNumberProps } from './HousingStockNumber.types';
import { Checkbox } from 'antd';
import { HousingStockNumberWrapper, Number } from './HousingStockNumber.styled';

export const HousingStockNumber: FC<HousingStockNumberProps> = ({
  housingStock,
  setAddress,
  currentStreetCheckedHousingStockIds,
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
        if (isDistributed) {
          return;
        }
        if (isChecked) {
          setAddress({
            address: housingStock,
            isToAdd: false,
          });

          setCheck(false);
        } else {
          setAddress({
            address: housingStock,
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
