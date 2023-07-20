import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { EResourceType } from 'api/myApi';
import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { HeatIndividualDevicesReportFormProps } from './HeatIndividualDevicesReportForm.types';
import { GroupWrapper } from './HeatIndividualDevicesReportForm.styled';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { DatePicker } from 'ui-kit/DatePicker';
import { AddressTreeSelect } from 'ui-kit/shared_components/AddressTreeSelect';
import { Select } from 'ui-kit/Select';
import { useStore } from 'effector-react';
import { validationSchema } from './HeatIndividualDevicesReportForm.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

export const HeatIndividualDevicesReportForm: FC<
  HeatIndividualDevicesReportFormProps
> = ({ handleDownloadModal, formId, selectCity, selectedCity, treeData }) => {
  const existingCities = useStore(addressSearchService.outputs.$existingCities);

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      resource: EResourceType.Heat,
      Name: 'Сводный_отчёт_ИПУ',
      HousingStockIds: [],
      date: moment()
        .startOf('month')
        .set('day', 15)
        .utcOffset(0, true)
        .format(),
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const { HousingStockIds, Name, date } = values;

      handleDownloadModal({
        HousingStockIds,
        Name,
        Month: Number(moment(date).format('MM')),
        Year: Number(moment(date).format('YYYY')),
      });
    },
  });

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <FormItem label="Название отчёта">
        <Input
          value={values.Name}
          name="name"
          onChange={(e) => setFieldValue('Name', e.target.value)}
          placeholder="Введите название"
          suffix={<>.zip</>}
        />
        <ErrorMessage>{errors.Name}</ErrorMessage>
      </FormItem>
      <GroupWrapper>
        <FormItem label="Город">
          <Select
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
        <FormItem label="Адрес">
          <AddressTreeSelect
            onChange={(ids) => setFieldValue('HousingStockIds', ids)}
            selectedHousingStockIds={values.HousingStockIds}
            treeData={treeData}
            disabled={!treeData.length}
          />
          <ErrorMessage>{errors.HousingStockIds}</ErrorMessage>
        </FormItem>
      </GroupWrapper>
      <GroupWrapper>
        <FormItem label="Ресурс">
          <ResourceSelect resource={values.resource} disabled />
        </FormItem>
        <FormItem label="Период">
          <DatePicker
            picker="month"
            format="MMMM YYYY"
            placeholder="Выберите"
            value={moment(values.date)}
            onChange={(date) =>
              setFieldValue(
                'date',
                date
                  ?.startOf('month')
                  .set('day', 15)
                  .utcOffset(0, true)
                  .format(),
              )
            }
          />
        </FormItem>
      </GroupWrapper>
    </Form>
  );
};
