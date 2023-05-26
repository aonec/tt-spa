import React, { FC, useEffect, useState } from 'react';
import { HousingStockNumberProps } from './HousingStockNumber.types';
import { Checkbox } from 'antd';
import { HousingStockNumberWrapper, Number } from './HousingStockNumber.styled';

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
    <HousingStockNumberWrapper
      onClick={() => {
        if (isChecked) {
          setHousingStockIds((prev) =>
            prev.filter(
              (housingStockId) =>
                housingStockId !== housingStock.housingStockId,
            ),
          );
          setCheck(false);
        } else {
          setHousingStockIds((prev) => [...prev, housingStock.housingStockId]);
          setCheck(true);
        }
      }}
    >
      <Checkbox checked={isChecked} />
      <Number isChecked={isChecked}>{housingStock.housingStockNumber} {housingStock.housingStockCorpus}</Number>
    </HousingStockNumberWrapper>
  );
};
