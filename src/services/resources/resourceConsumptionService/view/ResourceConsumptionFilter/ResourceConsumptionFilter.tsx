import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { SelectSC } from '01/shared/ui/Fields';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { AddressTreeSelect } from '../../../../../ui-kit/shared_components/AddressTreeSelect';
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
import { GetConsumptionDataFilter } from '../../resourceConsumptionService.types';
import { ResourceConsumptionFilterProps } from './ResourceConsumptionFilter.types';

export const ResourceConsumptionFilter: FC<ResourceConsumptionFilterProps> = ({
  setFilter,
  filter,
  streetsList,
  selectedHouseManagement,
  setHouseManagement,
  houseManagements,
  handleClearData,
  handleClearFilter,
  treeData,
  handleClearAdditionalAddressData,
}) => {
  const [isAdditionalAddress, setIsAdditionalAddress] = useState(false);

  const { values, setFieldValue, submitForm, resetForm, errors } =
    useFormik<GetConsumptionDataFilter>({
      initialValues: {
        HousingStockIds: filter?.HousingStockIds || [],
        AdditionalHousingStockIds: filter?.AdditionalHousingStockIds || [],
        From:
          filter?.From || moment().startOf('month').utcOffset(0, true).format(),
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

        setFilter({ ...values, HousingStockIds });
      },
    });

  useEffect(() => {
    setFieldValue('AdditionalHousingStockIds', []);
    setFieldValue('HousingStockIds', []);
  }, [streetsList, setFieldValue]);

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
          <AddressTreeSelect
            small
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
        <Button type="default" onClick={submitForm}>
          Применить фильтр
        </Button>
      </Footer>
    </Wrapper>
  );
};
