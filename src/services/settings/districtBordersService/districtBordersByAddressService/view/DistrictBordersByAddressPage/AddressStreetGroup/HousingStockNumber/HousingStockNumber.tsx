import React, { FC, useEffect, useState } from 'react';
import { HousingStockNumberProps } from './HousingStockNumber.types';
import { Checkbox } from 'antd';

export const HousingStockNumber: FC<HousingStockNumberProps> = ({
  housingStock,
  setHousingStockIds,
  housingStockIds,
}) => {
  const [isChecked, setCheck] = useState(false);

  useEffect(
    () =>
      setCheck(
        housingStockIds.some(
          (housingStockId) => housingStockId === housingStock.housingStockId,
        ),
      ),
    [housingStock, housingStockIds],
  );

  return (
    <>
      <Checkbox
        checked={isChecked}
        onChange={() => {
          if (isChecked) {
            setHousingStockIds((prev) =>
              prev.filter(
                (housingStockId) =>
                  housingStockId !== housingStock.housingStockId,
              ),
            );
            setCheck(false);
          } else {
            setHousingStockIds((prev) => [
              ...prev,
              housingStock.housingStockId,
            ]);
            setCheck(true);
          }
        }}
      />
      <div>{housingStock.housingStockNumber}</div>
    </>
  );
};
