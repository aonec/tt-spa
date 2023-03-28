import { StyledDatePicker, StyledRangePicker } from '01/shared/ui/Fields';
import { NumberRange } from '01/shared/ui/Fields/NumberRange';
import { Checkbox } from 'antd';
import moment from 'moment';
import React, { FC, useCallback, useEffect } from 'react';
import {
  DatesWrapper,
  ExcludeApartmentsWrapper,
  ResourceWrapper,
  TitleText,
} from './SubscribersConsumptionExtendedSearch.styled';
import { SubscribersConsumptionExtendedSearchProps } from './SubscribersConsumptionExtendedSearch.types';
import { prepareConsumptionForInput } from './SubscribersConsumptionExtendedSearch.utils';

export const SubscribersConsumptionExtendedSearch: FC<
  SubscribersConsumptionExtendedSearchProps
> = ({ values, setFieldValue }) => {
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
    (dates: [moment.Moment | null, moment.Moment | null] | null) => {
      if (!dates) {
        setFieldValue('DateLastCheckFrom', undefined);
        setFieldValue('DateLastCheckTo', undefined);
        return;
      }
      const dateLastCheckFromValue = dates[0];
      const dateLastCheckTo = dates[1];

      console.log(dateLastCheckTo);

      if (!dateLastCheckTo || !dateLastCheckFromValue) {
        return;
      }

      setFieldValue(
        'DateLastCheckFrom',
        dateLastCheckFromValue.startOf('day').format(),
      );
      setFieldValue('DateLastCheckTo', dateLastCheckTo.endOf('day').format());
    },
    [setFieldValue],
  );

  useEffect(() => {
    if (ExcludeApartments) {
      setFieldValue(
        'DateLastCheckFrom',
        moment().subtract(3, 'month').toISOString(),
      );
      setFieldValue('DateLastCheckTo', moment().toISOString());
    }
    if (!ExcludeApartments) {
      setFieldValue('DateLastCheckFrom', undefined);
      setFieldValue('DateLastCheckTo', undefined);
    }
  }, [ExcludeApartments, setFieldValue]);

  return (
    <div>
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
            from: prepareConsumptionForInput(ColdWaterSupplyConsumptionFrom),
            to: prepareConsumptionForInput(ColdWaterSupplyConsumptionTo),
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
            from: prepareConsumptionForInput(HotWaterSupplyConsumptionFrom),
            to: prepareConsumptionForInput(HotWaterSupplyConsumptionTo),
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
            from: prepareConsumptionForInput(ElectricitySupplyConsumptionFrom),
            to: prepareConsumptionForInput(ElectricitySupplyConsumptionTo),
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
                  moment(DateLastCheckFrom) || null,
                  moment(DateLastCheckTo).startOf('day') || null,
                ]
              : null
          }
          format="DD.MM.YYYY"
          onChange={(dates) => handleChangeDateRange(dates)}
        />

        <StyledDatePicker
          allowClear
          onChange={(value) => {
            setFieldValue(
              'MonthOfLastTransmission',
              value && value.toISOString(true),
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
    </div>
  );
};
