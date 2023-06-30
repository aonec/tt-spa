import { RefSelectProps } from 'antd/lib/select';
import React, { FC, useRef } from 'react';
import { Address, Wrap } from './HousingStockItem.styled';
import { HousingStockItemProps } from './HousingStockItem.types';
import { Select } from 'ui-kit/Select';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
  inspectors,
  days,
  updateInfo,
  updateHousingStock,
}) => {
  const inspectedDatSelectRef = useRef<RefSelectProps | null>(null);
  const inspectorSelectRef = useRef<RefSelectProps | null>(null);

  return (
    <Wrap>
      <Address>{`ул. ${housingStock.street} ${housingStock.number}${
        housingStock.corpus || ''
      }`}</Address>
      <div>{housingStock.houseManagementName}</div>
      <Select
        ref={inspectedDatSelectRef}
        placeholder="Число"
        disabled={updateInfo?.status === 'loading'}
        value={housingStock.inspectedDay || void 0}
        style={{
          borderColor: updateInfo?.status === 'failed' ? 'red' : void 0,
        }}
        small
        onChange={(value) => {
          inspectedDatSelectRef?.current?.blur();
          updateHousingStock({
            inspectedDay: value as number,
            inspectorId: housingStock.inspectorId!,
          });
        }}
      >
        {days?.map((day) => (
          <Select.Option key={day} value={day}>
            {day} число
          </Select.Option>
        ))}
      </Select>
      <Select
        ref={inspectorSelectRef}
        placeholder="Контролер"
        disabled={updateInfo?.status === 'loading'}
        value={housingStock.inspectorId || void 0}
        style={{
          borderColor: updateInfo?.status === 'failed' ? 'red' : void 0,
        }}
        onChange={(value) => {
          inspectorSelectRef?.current?.blur();
          updateHousingStock({ inspectorId: value as number });
        }}
        small
      >
        {inspectors?.map((inspector) => (
          <Select.Option key={inspector.id} value={inspector.id}>
            {inspector.fullName}
          </Select.Option>
        ))}
      </Select>
    </Wrap>
  );
};
