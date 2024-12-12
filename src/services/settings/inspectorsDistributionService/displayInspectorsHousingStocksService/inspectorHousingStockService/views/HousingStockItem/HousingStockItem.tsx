import { RefSelectProps } from 'antd/lib/select';
import React, { FC, useRef } from 'react';
import {
  AddInspecor,
  Address,
  InspectorOption,
  Wrap,
} from './HousingStockItem.styled';
import { HousingStockItemProps } from './HousingStockItem.types';
import { Select } from 'ui-kit/Select';
import { TrashIcon } from 'ui-kit/icons';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
  inspectors,
  days,
  updateInfo,
  updateHousingStock,
  handleOpenAddInspector,
  handleDeleteInspector,
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
        virtual={false}
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
        placeholder="Инспектор"
        disabled={updateInfo?.status === 'loading'}
        value={housingStock.inspectorId || void 0}
        style={{
          borderColor: updateInfo?.status === 'failed' ? 'red' : void 0,
        }}
        onChange={(value) => {
          inspectorSelectRef?.current?.blur();
          if (value) updateHousingStock({ inspectorId: value as number });
        }}
        small
        virtual={false}
        dropdownRender={(menu) => (
          <>
            {menu}
            <AddInspecor
              onClick={() => handleOpenAddInspector(housingStock.buildingId)}
            >
              + Добавить инспектора
            </AddInspecor>
          </>
        )}
      >
        {inspectors?.map((inspector) => (
          <Select.Option key={inspector.id} value={inspector.id}>
            <InspectorOption>
              {inspector.fullName}{' '}
              {inspector.id !== housingStock.inspectorId && (
                <TrashIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteInspector(inspector.id);
                  }}
                />
              )}
            </InspectorOption>
          </Select.Option>
        ))}
      </Select>
    </Wrap>
  );
};
