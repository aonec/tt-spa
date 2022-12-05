import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { GetHousingConsumptionDataFormik } from '../../resourceConsumptionService.types';
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
}) => {
  const initialDate = filter?.From
    ? filter.From
    : moment().startOf('month').utcOffset(0, true).format();

  const {
    values,
    setFieldValue,
    submitForm,
    resetForm,
  } = useFormik<GetHousingConsumptionDataFormik>({
    initialValues: {
      HousingStockId: filter?.HousingStockId || 600,
      From: initialDate,
    },
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
