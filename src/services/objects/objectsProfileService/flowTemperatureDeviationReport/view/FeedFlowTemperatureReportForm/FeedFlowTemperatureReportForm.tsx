import React, { FC } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { Form } from 'antd';
import { EResourceType } from 'api/types';
import { FormItem } from 'ui-kit/FormItem';
import { Input, InputWithAddon } from 'ui-kit/Input';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Select } from 'ui-kit/Select';
import { ResourceSelect } from 'ui-kit/shared/ResourceSelect';
import { flowTemperatureDeviationReportService } from '../../flowTemperatureDeviationReportService.models';
import { LineWrapper } from './FeedFlowTemperatureReportForm.styled';
import { Props } from './FeedFlowTemperatureReportForm.types';
import { validationSchema } from './FeedFlowTemperatureReportForm.constants';

const {
  gates: { HouseManagementsGate },
} = flowTemperatureDeviationReportService;
const withoutHouseMagement = 'withoutHouseMagement';

export const FeedFlowTemperatureReportForm: FC<Props> = ({
  existingCities,
  houseManagements,
  formId,
  handleExportReport,
}) => {
  const { values, handleChange, setFieldValue, handleSubmit, errors } =
    useFormik({
      initialValues: {
        name: `Сводный_отчёт_по_ГВС_${moment().format('DD.MM.YYYY')}`,
        city: null as null | string,
        houseMangementId: null as null | string,
        temperature: '',
      },
      onSubmit: (values) => {
        if (!values.name || !values.temperature) {
          return;
        }

        handleExportReport({
          Name: values.name,
          HouseManagementId: values.houseMangementId!,
          LimitTemperature: Number(values.temperature),
        });
      },
      validationSchema,
      validateOnChange: false,
    });

  return (
    <>
      <HouseManagementsGate City={values.city || undefined} />
      <Form id={formId} onSubmitCapture={handleSubmit}>
        <FormItem label="Название отчёта">
          <Input
            value={values.name}
            name="name"
            onChange={handleChange}
            placeholder="Введите название"
            suffix={<>.xlsx</>}
          />
          <ErrorMessage>{errors.name}</ErrorMessage>
        </FormItem>
        <LineWrapper>
          <FormItem label="Город">
            <Select
              placeholder="Выберите город"
              value={values.city || undefined}
              onChange={(value) => setFieldValue('city', value)}
            >
              {existingCities?.map((city) => (
                <Select.Option key={city} value={city}>
                  {city}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="УК или домоуправление">
            <Select
              placeholder="Выберите домоуправление"
              value={
                values.houseMangementId === null
                  ? withoutHouseMagement
                  : values.houseMangementId || undefined
              }
              onChange={(value) => {
                if (value === withoutHouseMagement) {
                  return setFieldValue('houseMangementId', null);
                }
                setFieldValue('houseMangementId', value);
              }}
            >
              <Select.Option value={withoutHouseMagement}>
                Без домоуправления
              </Select.Option>
              {houseManagements?.map((houseManagement) => (
                <Select.Option
                  key={houseManagement.id}
                  value={houseManagement.id}
                >
                  {houseManagement.name}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage>{errors.houseMangementId}</ErrorMessage>
          </FormItem>
          <FormItem label="Тип ресурса">
            <ResourceSelect resource={EResourceType.HotWaterSupply} disabled />
          </FormItem>
          <FormItem label="Температура ГВС на вводе">
            <InputWithAddon
              type="number"
              placeholder="Введите температуру"
              addonAfter="°C"
              value={values.temperature}
              name="temperature"
              onChange={handleChange}
            />
            <ErrorMessage>{errors.temperature}</ErrorMessage>
          </FormItem>
        </LineWrapper>
      </Form>
    </>
  );
};
