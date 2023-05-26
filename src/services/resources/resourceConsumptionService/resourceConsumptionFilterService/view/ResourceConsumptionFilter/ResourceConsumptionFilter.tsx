import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { AddressTreeSelect } from '../../../../../../ui-kit/shared_components/AddressTreeSelect';
import { resourceConsumptionFilterValidationSchema } from './ResourceConsumptionFilter.constants';
import {
  AdditionalAddressWrapper,
  ContentWrapper,
  DatePickerSC,
  Footer,
  FormWrapper,
  GroupWrapper,
  TitleText,
  TrashIconSC,
  Wrapper,
} from './ResourceConsumptionFilter.styled';
import { ResourceConsumptionFilterProps } from './ResourceConsumptionFilter.types';
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { useStore } from 'effector-react';
import { ConsumptionDataFilter } from '../../resourceConsumptionFilterService.types';
import { Select } from 'ui-kit/Select';

export const ResourceConsumptionFilter: FC<ResourceConsumptionFilterProps> = ({
  setFilter,
  filter,
  selectedHouseManagement,
  setHouseManagement,
  houseManagements,
  handleClearData,
  handleClearFilter,
  treeData,
  handleClearAdditionalAddressData,
  selectCity,
  selectedCity,
  isLoading,
  handleClearSummary,
}) => {
  const existingCities = useStore($existingCities);
  const [isAdditionalAddress, setIsAdditionalAddress] = useState(false);

  const { values, setFieldValue, submitForm, errors, setValues } = useFormik<
    Omit<ConsumptionDataFilter, 'To'>
  >({
    initialValues: {
      HousingStockIds: filter.HousingStockIds || [],
      AdditionalHousingStockIds: filter.AdditionalHousingStockIds || [],
      From: filter.From,
    },
    validationSchema: resourceConsumptionFilterValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const { HousingStockIds, AdditionalHousingStockIds } = values;

      if (!HousingStockIds.length) {
        return;
      }

      if (!AdditionalHousingStockIds.length) {
        handleClearAdditionalAddressData();
      }

      setFilter({
        ...values,
        HousingStockIds,
        To: moment(values.From).endOf('month').utcOffset(0, true).format(),
      });
    },
  });

  useEffect(() => {
    setValues(filter);
  }, [filter, setValues]);

  useEffect(() => {
    if (selectedCity) {
      setFieldValue('HousingStockIds', []);
      setFieldValue('AdditionalHousingStockIds', []);
    }
  }, [selectedCity, setFieldValue]);

  const handleReset = useCallback(() => {
    handleClearFilter();
    handleClearData();
    handleClearSummary();
    handleClearAdditionalAddressData();
  }, [
    handleClearData,
    handleClearFilter,
    handleClearAdditionalAddressData,
    handleClearSummary,
  ]);

  return (
    <Wrapper>
      <ContentWrapper>
        <TitleText>Фильтры</TitleText>
        <FormWrapper>
          <FormItem label="Период">
            <DatePickerSC
              value={moment(values.From)}
              onChange={(date) =>
                setFieldValue(
                  'From',
                  date?.startOf('month').utcOffset(0, true).format(),
                )
              }
              picker="month"
              format={'MMMM YYYY'}
              disabledDate={(month) => {
                const currentMonth = moment().startOf('month');
                const selectedMonth = month.startOf('month');
                const diff = currentMonth.diff(selectedMonth, 'month');
                return diff < 0;
              }}
            />
          </FormItem>
          <FormItem label="Город">
            <Select
              small
              disabled={!(existingCities || []).length}
              onChange={(value) => selectCity(String(value))}
              value={selectedCity || undefined}
              placeholder="Выберите город"
            >
              {(existingCities || []).map((city) => (
                <Select.Option key={city} value={city}>
                  {city}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </FormWrapper>
        <FormItem label="Домоуправление">
          <Select
            small
            disabled={!houseManagements.length}
            placeholder="Выберите из списка"
            value={selectedHouseManagement || undefined}
            onChange={(id) => setHouseManagement(id ? String(id) : null)}
            allowClear
          >
            {houseManagements.map((management) => {
              if (!management.name) {
                return null;
              }
              return (
                <Select.Option key={management.id} value={management.id}>
                  {management.name}
                </Select.Option>
              );
            })}
          </Select>
        </FormItem>
        <FormItem label="Адрес">
          <AddressTreeSelect
            small
            disabled={!treeData.length}
            treeData={treeData}
            placeholder="Выберите из списка"
            onChange={(ids) => setFieldValue('HousingStockIds', ids)}
            selectedHousingStockIds={values.HousingStockIds}
          />
          <ErrorMessage>{errors.HousingStockIds}</ErrorMessage>
        </FormItem>
        {!isAdditionalAddress && (
          <AdditionalAddressWrapper
            onClick={() => setIsAdditionalAddress(true)}
          >
            + Добавить адрес для сравнения
          </AdditionalAddressWrapper>
        )}
        {isAdditionalAddress && (
          <FormItem label="Адрес для сравнения">
            <GroupWrapper>
              <AddressTreeSelect
                small
                treeData={treeData}
                placeholder="Выберите из списка"
                onChange={(ids) =>
                  setFieldValue('AdditionalHousingStockIds', ids)
                }
                selectedHousingStockIds={values.AdditionalHousingStockIds}
              />
              <TrashIconSC
                onClick={() => {
                  setIsAdditionalAddress(false);
                  setFieldValue('AdditionalHousingStockIds', []);
                }}
              />
            </GroupWrapper>
          </FormItem>
        )}
      </ContentWrapper>
      <Footer>
        <Button type="ghost" onClick={handleReset}>
          Сбросить
        </Button>
        <Button type="primary" onClick={submitForm} isLoading={isLoading}>
          Применить фильтр
        </Button>
      </Footer>
    </Wrapper>
  );
};
