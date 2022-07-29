import { Select } from 'antd';
import { RefSelectProps } from 'antd/lib/select';
import React, { FC, useRef } from 'react';
import { SelectSC } from '../../../../../../../shared/ui/Fields';
import { Address, Wrap } from './HousingStockItem.styled';
import { HousingStockItemProps } from './HousingStockItem.types';

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
      <div>{housingStock.houseManagement}</div>
      <SelectSC
        ref={inspectedDatSelectRef}
        placeholder="Число"
        isShadow={false}
        disabled={updateInfo?.status === 'loading'}
        value={housingStock.inspectedDay || void 0}
        style={{
          borderColor: updateInfo?.status === 'failed' ? 'red' : void 0,
        }}
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
      </SelectSC>
      <SelectSC
        ref={inspectorSelectRef}
        placeholder="Контролер"
        isShadow={false}
        disabled={updateInfo?.status === 'loading'}
        value={housingStock.inspectorId || void 0}
        style={{
          borderColor: updateInfo?.status === 'failed' ? 'red' : void 0,
        }}
        onChange={(value) => {
          inspectorSelectRef?.current?.blur();
          updateHousingStock({ inspectorId: value as number });
        }}
      >
        {inspectors?.map((inspector) => (
          <Select.Option key={inspector.id} value={inspector.id}>
            {inspector.fullName}
          </Select.Option>
        ))}
      </SelectSC>
    </Wrap>
  );
};
