import { StyledDatePicker, StyledRangePicker } from '01/shared/ui/Fields';
import { NumberRange } from '01/shared/ui/Fields/NumberRange';
import { Checkbox } from 'antd';
import moment from 'moment';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import {
  DatesWrapper,
  ExcludeApartmentsWrapper,
  ResourceWrapper,
  TitleText,
  Wrapper,
} from './SubscribersConsumptionExtendedSearch.styled';
import { SubscribersConsumptionExtendedSearchProps } from './SubscribersConsumptionExtendedSearch.types';

export const SubscribersConsumptionExtendedSearch: FC<SubscribersConsumptionExtendedSearchProps> = ({
  values,
  setFieldValue,
}) => {
  const {
    ColdWaterSupply,
    HotWaterSupply,
    Electricity,
    ColdWaterSupplyConsumptionFrom,
    ColdWaterSupplyConsumptionTo,
    ElectricitySupplyConsumptionFrom,
    ElectricitySupplyConsumptionTo,
    HotWaterSupplyConsumptionFrom,
    HotWaterSupplyConsumptionTo,
    MonthOfLastTransmission,
    ExcludeApartments,
    DateLastCheckFrom,
    DateLastCheckTo,
  } = values;

  const handleChangeDateRange = useCallback(
    (dates: [string, string]) => {
      const dateLastCheckFromValue = dates[0];
      const dateLastCheckTo = dates[1];

      setFieldValue(
        'DateLastCheckFrom',
        moment(dateLastCheckFromValue).toISOString()
      );
      setFieldValue('DateLastCheckTo', moment(dateLastCheckTo).toISOString());
    },
    [setFieldValue]
  );

  useEffect(() => {
    if (ExcludeApartments) {
      setFieldValue(
        'DateLastCheckFrom',
        moment().subtract(3, 'month').toISOString()
      );
      setFieldValue('DateLastCheckTo', moment().toISOString());
    }
    if (!ExcludeApartments) {
      setFieldValue('DateLastCheckFrom', undefined);
      setFieldValue('DateLastCheckTo', undefined);
    }
  }, [ExcludeApartments]);

  return (
    <Wrapper>
      <ResourceWrapper>
        <TitleText>Ресурс</TitleText>
        <TitleText>Диапазон значений</TitleText>

        <Checkbox
          checked={ColdWaterSupply}
          onChange={(value) =>
            setFieldValue('ColdWaterSupply', value.target.checked)
          }
        >
          ХВС
        </Checkbox>
        <NumberRange
          disabled={!ColdWaterSupply}
          value={{
            from: ColdWaterSupplyConsumptionFrom || null,
            to: ColdWaterSupplyConsumptionTo || null,
          }}
          onChange={({ from, to }) => {
            setFieldValue('ColdWaterSupplyConsumptionFrom', from);
            setFieldValue('ColdWaterSupplyConsumptionTo', to);
          }}
        />

        <Checkbox
          checked={HotWaterSupply}
          onChange={(value) =>
            setFieldValue('HotWaterSupply', value.target.checked)
          }
        >
          ГВС
        </Checkbox>
        <NumberRange
          disabled={!HotWaterSupply}
          value={{
            from: HotWaterSupplyConsumptionFrom || null,
            to: HotWaterSupplyConsumptionTo || null,
          }}
          onChange={({ from, to }) => {
            setFieldValue('HotWaterSupplyConsumptionFrom', from);
            setFieldValue('HotWaterSupplyConsumptionTo', to);
          }}
        />

        <Checkbox
          checked={Electricity}
          onChange={(value) =>
            setFieldValue('Electricity', value.target.checked)
          }
        >
          Электричество
        </Checkbox>
        <NumberRange
          disabled={!Electricity}
          value={{
            from: ElectricitySupplyConsumptionFrom || null,
            to: ElectricitySupplyConsumptionTo || null,
          }}
          onChange={({ from, to }) => {
            setFieldValue('ElectricitySupplyConsumptionFrom', from);
            setFieldValue('ElectricitySupplyConsumptionTo', to);
          }}
        />
      </ResourceWrapper>

      <DatesWrapper>
        <TitleText>Период проверки ИПУ</TitleText>
        <TitleText>Месяц последней передачи показаний</TitleText>

        <StyledRangePicker
          allowClear
          disabled={ExcludeApartments}
          value={
            DateLastCheckFrom && DateLastCheckTo
              ? [
                  moment(DateLastCheckFrom) || undefined,
                  moment(DateLastCheckTo) || undefined,
                ]
              : undefined
          }
          format="DD.MM.YYYY"
          onChange={(_, dates) => handleChangeDateRange(dates)}
        />

        <StyledDatePicker
          allowClear
          onChange={(value) => {
            setFieldValue(
              'MonthOfLastTransmission',
              value && value.toISOString(true)
            );
          }}
          value={
            MonthOfLastTransmission
              ? moment(MonthOfLastTransmission).startOf('month')
              : undefined
          }
          picker="month"
          format="MMMM YYYY"
          disabledDate={(date) => {
            const diff = moment(date).diff(moment(), 'months');

            return diff >= 1;
          }}
        />
      </DatesWrapper>

      <ExcludeApartmentsWrapper>
        <Checkbox
          checked={ExcludeApartments}
          onChange={(e) => setFieldValue('ExcludeApartments', e.target.checked)}
        >
          Исключить квартиры, где проверка проводилась менее 3 месяцев назад
        </Checkbox>
      </ExcludeApartmentsWrapper>
    </Wrapper>
  );
};
