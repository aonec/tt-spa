import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { useFormik } from 'formik';
import dayjs from 'api/dayjs';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { AddressTreeSelect } from '../../../../../../ui-kit/shared/AddressTreeSelect';
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
import { useUnit } from 'effector-react';
import { ConsumptionDataFilter } from '../../resourceConsumptionFilterService.types';
import { Select } from 'ui-kit/Select';
import { resourceConsumptionFilterService } from '../../resourceConsumptionFilterService.model';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

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
  const { existingCities } = useUnit({
    existingCities: addressSearchService.outputs.$existingCities,
  });
  const [isAdditionalAddress, setIsAdditionalAddress] = useState(false);

  const { values, setFieldValue, submitForm, errors, setValues } = useFormik<
    Omit<ConsumptionDataFilter, 'To'>
  >({
    initialValues: {
      BuildingIds: filter.BuildingIds || [],
      AdditionalHousingStockIds: filter.AdditionalHousingStockIds || [],
      From: filter.From,
    },
    validationSchema: resourceConsumptionFilterValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const { BuildingIds, AdditionalHousingStockIds } = values;

      if (!BuildingIds.length) {
        return;
      }

      if (!AdditionalHousingStockIds.length) {
        handleClearAdditionalAddressData();
      }

      setFilter({
        ...values,
        BuildingIds,
        To: dayjs(values.From).endOf('month').utcOffset(0, true).format(),
      });
    },
  });

  useEffect(
    () =>
      resourceConsumptionFilterService.outputs.$selectedHouseManagement.watch(
        (houseManagement) => {
          if (houseManagement) {
            setFieldValue('BuildingIds', []);
            setFieldValue('AdditionalHousingStockIds', []);
          }
        },
      ).unsubscribe,
    [setFieldValue],
  );

  useEffect(
    () =>
      resourceConsumptionFilterService.outputs.$resourceConsumptionFilter.watch(
        setValues,
      ).unsubscribe,
    [setValues],
  );

  useEffect(() => {
    if (selectedCity) {
      setFieldValue('BuildingIds', []);
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
              value={dayjs(values.From)}
              onChange={(date) =>
                setFieldValue(
                  'From',
                  date?.startOf('month').utcOffset(0, true).format(),
                )
              }
              picker="month"
              format={'MMMM YYYY'}
              disabledDate={(month) => {
                const currentMonth = dayjs().startOf('month');
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
            onChange={(ids) => setFieldValue('BuildingIds', ids)}
            selectedHousingStockIds={values.BuildingIds}
            placement="topLeft"
          />
          <ErrorMessage>{errors.BuildingIds}</ErrorMessage>
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
                placement="topLeft"
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
        <Button onClick={submitForm} isLoading={isLoading}>
          Применить фильтр
        </Button>
      </Footer>
    </Wrapper>
  );
};
