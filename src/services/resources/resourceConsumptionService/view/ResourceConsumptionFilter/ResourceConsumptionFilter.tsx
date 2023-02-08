import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { SelectSC } from '01/shared/ui/Fields';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { AddressAutoCompleteSearch } from './AddressAutoCompleteSearch';
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
import {
  GetHousingConsumptionDataFormik,
  ResourceConsumptionFilterProps,
} from './ResourceConsumptionFilter.types';

export const ResourceConsumptionFilter: FC<ResourceConsumptionFilterProps> = ({
  setFilter,
  filter,
  streetsList,
  selectedHouseManagement,
  setHouseManagement,
  houseManagements,
  handleClearData,
  handleClearFilter,
  handleClearAdditionalAddress,
}) => {
  const [isAdditionalAddress, setIsAdditionalAddress] = useState(false);

  const initialDate = useMemo(
    () =>
      filter?.From
        ? filter.From
        : moment().startOf('month').utcOffset(0, true).format(),
    [filter?.From],
  );

  const { values, setFieldValue, submitForm, resetForm, errors, setValues } =
    useFormik<GetHousingConsumptionDataFormik>({
      initialValues: {
        HousingStockId: filter?.HousingStockId || null,
        currentAddress: filter?.currentAddress || null,
        AdditionalHousingStockId: filter?.AdditionalHousingStockId || null,
        additionalAddress: filter?.additionalAddress || null,
        From: initialDate,
      },
      validationSchema: resourceConsumptionFilterValidationSchema,
      enableReinitialize: true,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: (values) => {
        const { HousingStockId, AdditionalHousingStockId } = values;

        if (!HousingStockId) {
          return;
        }

        if (!AdditionalHousingStockId) {
          handleClearAdditionalAddress();
        }

        setFilter({ ...values, HousingStockId });
      },
    });

  useEffect(() => {
    setValues({
      additionalAddress: null,
      currentAddress: null,
      AdditionalHousingStockId: null,
      HousingStockId: null,
      From: initialDate,
    });
  }, [streetsList, initialDate, setValues]);

  const handleReset = useCallback(() => {
    resetForm();
    setHouseManagement('');
    handleClearData();
    handleClearFilter();
  }, [resetForm, setHouseManagement, handleClearData, handleClearFilter]);

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
          <AddressSearchContainer
            disabledFields={[SearchFieldType.City]}
            fields={[SearchFieldType.City]}
            showLabels
            customTemplate={[
              {
                fieldType: SearchFieldType.City,
                templateValue: '100%',
              },
            ]}
          />
        </FormWrapper>
        <FormItem label="Домоуправление">
          <SelectSC
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
                <SelectSC.Option key={management.id} value={management.id}>
                  {management.name}
                </SelectSC.Option>
              );
            })}
          </SelectSC>
        </FormItem>
        <FormItem label="Адрес">
          <AddressAutoCompleteSearch
            streetsList={streetsList}
            handleChooseHousingStock={({ id, address }) => {
              setFieldValue('HousingStockId', id);
              setFieldValue('currentAddress', address);
            }}
          />
          <ErrorMessage>{errors.HousingStockId}</ErrorMessage>
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
              <AddressAutoCompleteSearch
                streetsList={streetsList}
                handleChooseHousingStock={({ id, address }) => {
                  setFieldValue('AdditionalHousingStockId', id);
                  setFieldValue('additionalAddress', address);
                }}
              />
              <TrashIconSC
                onClick={() => {
                  setIsAdditionalAddress(false);
                  setFieldValue('AdditionalHousingStockId', null);
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
        <Button type="default" onClick={submitForm}>
          Применить фильтр
        </Button>
      </Footer>
    </Wrapper>
  );
};
