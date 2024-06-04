import { Checkbox } from 'antd';
import dayjs from 'api/dayjs';
import React, { FC, useCallback, useEffect } from 'react';
import {
  DatesWrapper,
  ExcludeApartmentsWrapper,
  ResourceWrapper,
  TitleText,
} from './SubscribersConsumptionExtendedSearch.styled';
import { SubscribersConsumptionExtendedSearchProps } from './SubscribersConsumptionExtendedSearch.types';
import { prepareConsumptionForInput } from './SubscribersConsumptionExtendedSearch.utils';
import { RangePicker } from 'ui-kit/RangePicker';
import { DatePicker } from 'ui-kit/DatePicker';
import { NumberRange } from './NumberRange';

export const SubscribersConsumptionExtendedSearch: FC<
  SubscribersConsumptionExtendedSearchProps
> = ({ values, setFieldValue }) => {
  const {
    ColdWaterSupply,
    HotWaterSupply,
    Electricity,
    Heat,
    ExcludeApartments,
    DateLastCheckFrom,
    DateLastCheckTo,
  } = values;

  const handleChangeDateRange = useCallback(
    (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
      if (!dates) {
        setFieldValue('DateLastCheckFrom', undefined);
        setFieldValue('DateLastCheckTo', undefined);
        return;
      }
      const dateLastCheckFromValue = dates[0];
      const dateLastCheckTo = dates[1];

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
        dayjs().subtract(3, 'month').toISOString(),
      );
      setFieldValue('DateLastCheckTo', dayjs().toISOString());
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
            from: prepareConsumptionForInput(
              values['ColdWaterSupplyFilter.From'],
            ),
            to: prepareConsumptionForInput(values['ColdWaterSupplyFilter.To']),
          }}
          onChange={({ from, to }) => {
            setFieldValue("['ColdWaterSupplyFilter.From']", from);
            setFieldValue("['ColdWaterSupplyFilter.To']", to);
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
            from: prepareConsumptionForInput(
              values['HotWaterSupplyFilter.From'],
            ),
            to: prepareConsumptionForInput(values['HotWaterSupplyFilter.To']),
          }}
          onChange={({ from, to }) => {
            setFieldValue("['HotWaterSupplyFilter.From']", from);
            setFieldValue("['HotWaterSupplyFilter.To']", to);
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
            from: prepareConsumptionForInput(values['ElectricityFilter.From']),
            to: prepareConsumptionForInput(values['ElectricityFilter.To']),
          }}
          onChange={({ from, to }) => {
            setFieldValue("['ElectricityFilter.From']", from);
            setFieldValue("['ElectricityFilter.To']", to);
          }}
        />
        <Checkbox
          checked={Heat}
          onChange={(value) => setFieldValue('Heat', value.target.checked)}
        >
          Отопление
        </Checkbox>
        <NumberRange
          disabled={!Heat}
          value={{
            from: prepareConsumptionForInput(values['HeatFilter.From']),
            to: prepareConsumptionForInput(values['HeatFilter.To']),
          }}
          onChange={({ from, to }) => {
            setFieldValue("['HeatFilter.From']", from);
            setFieldValue("['HeatFilter.To']", to);
          }}
        />
      </ResourceWrapper>

      <DatesWrapper>
        <TitleText>Период проверки ИПУ</TitleText>
        <TitleText>Месяц последней передачи показаний</TitleText>

        <RangePicker
          small
          allowClear
          disabled={ExcludeApartments}
          value={
            DateLastCheckFrom && DateLastCheckTo
              ? [
                  dayjs(DateLastCheckFrom) || null,
                  dayjs(DateLastCheckTo).startOf('day') || null,
                ]
              : null
          }
          format={{ format: 'DD.MM.YYYY', type: 'mask' }}
          onChange={(dates) => handleChangeDateRange(dates)}
        />

        <DatePicker
          small
          allowClear
          onChange={(value) => {
            setFieldValue(
              'MonthOfLastTransmission',
              value && Number(value.month() + 1),
            );

            setFieldValue(
              'YearOfLastTransmission',
              value && Number(value.format('YYYY')),
            );
          }}
          picker="month"
          format="MMMM YYYY"
          disabledDate={(date) => {
            const diff = dayjs(date).diff(dayjs(), 'months');

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
