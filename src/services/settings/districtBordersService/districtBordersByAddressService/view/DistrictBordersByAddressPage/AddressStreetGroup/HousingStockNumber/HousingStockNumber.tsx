import React, { FC, useState } from 'react';
import { HousingStockNumberProps } from './HousingStockNumber.types';
import { Checkbox } from 'antd';

export const HousingStockNumber: FC<HousingStockNumberProps> = ({
  housingStock,
  setHousingStockIds,
  housingStockIds,
}) => {
  const [isChecked, setCheck] = useState(false);

  setCheck(
    housingStockIds.some(
      (housingStockId) => housingStockId === housingStock.housingStockId,
    ),
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
