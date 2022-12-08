import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { SelectSC } from '01/shared/ui/Fields';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { managementFirmConsumptionRatesService } from 'services/meters/managementFirmConsumptionRatesService';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { GetHousingConsumptionDataFormik } from '../../resourceConsumptionService.types';
import { AddressAutoCompleteSearch } from './AddressAutoCompleteSearch';
import { resourceConsumptionFilterValidationSchema } from './ResourceConsumptionFilter.constants';
import {
  ContentWrapper,
  DatePickerSC,
  Footer,
  FormWrapper,
  TitleText,
  Wrapper,
} from './ResourceConsumptionFilter.styled';
import { ResourceConsumptionFilterProps } from './ResourceConsumptionFilter.types';

export const ResourceConsumptionFilter: FC<ResourceConsumptionFilterProps> = ({
  setFilter,
  filter,
  streetsList,
  selectedHouseManagement,
  setHouseManagement,
  houseManagements,
}) => {
  const initialDate = filter?.From
    ? filter.From
    : moment().startOf('month').utcOffset(0, true).format();

  const {
    values,
    setFieldValue,
    submitForm,
    resetForm,
    errors,
  } = useFormik<GetHousingConsumptionDataFormik>({
    initialValues: {
      HousingStockId: filter?.HousingStockId || 0,
      From: initialDate,
    },
    validationSchema: resourceConsumptionFilterValidationSchema,
    enableReinitialize: true,
    onSubmit: setFilter,
  });

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
                  date?.startOf('month').utcOffset(0, true).format()
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
            onChange={(id) => setHouseManagement(String(id))}
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
            handleChooseHousingStock={(id) =>
              setFieldValue('HousingStockId', id)
            }
          />
          <ErrorMessage>{errors.HousingStockId}</ErrorMessage>
        </FormItem>
      </ContentWrapper>
      <Footer>
        <Button type="ghost" onClick={() => resetForm()}>
          Отмена
        </Button>
        <Button type="default" onClick={() => submitForm()}>
          Применить фильтр
        </Button>
      </Footer>
    </Wrapper>
  );
};
