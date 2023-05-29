import React, { FC, useEffect, useState } from 'react';
import { HousingStockNumberProps } from './HousingStockNumber.types';
import { Checkbox } from 'antd';
import { HousingStockNumberWrapper, Number } from './HousingStockNumber.styled';

export const HousingStockNumber: FC<HousingStockNumberProps> = ({
  housingStock,
  setHousingStockIds,
  currentStreetCheckedHousingStockIds,
  checkedhousingStockIds,
  street,
}) => {
  const [isChecked, setCheck] = useState(false);

  const currentHousingStockId = housingStock.housingStockId;

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
          setHousingStockIds(
            checkedhousingStockIds.map((housingStock) => {
              return housingStock.street !== street
                ? housingStock
                : {
                    ...housingStock,
                    housingStocksId: currentStreetCheckedHousingStockIds.filter(
                      (streetCheckedHousingStock) =>
                        streetCheckedHousingStock !== currentHousingStockId,
                    ),
                  };
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
                    housingStocksId: [
                      ...currentStreetCheckedHousingStockIds,
                      currentHousingStockId,
                    ],
                  };
            }),
          );

          setCheck(true);
        }
      }}
    >
      <Checkbox checked={isChecked} />
      <Number isChecked={isChecked}>
        {housingStock.housingStockNumber} {housingStock.housingStockCorpus}
      </Number>
    </HousingStockNumberWrapper>
  );
};
