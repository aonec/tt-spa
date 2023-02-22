import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { EResourceType } from 'myApi';
import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Input, InputWithAddon } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { feedFlowBackReportService } from '../../feedFlowBackReportService.model';
import { validationSchema } from './FeedFlowBackReportForm.constants';
import { LineWrapper } from './FeedFlowBackReportForm.styled';
import { FeedFlowBackReportFormProps } from './FeedFlowBackReportForm.types';

const {
  gates: { HouseManagementsGate },
} = feedFlowBackReportService;
const withoutHouseMagement = 'withoutHouseMagement';

export const FeedFlowBackReportForm: FC<FeedFlowBackReportFormProps> = ({
  existingCities,
  houseManagements,
  formId,
  handleExportReport,
}) => {
  const { values, handleChange, setFieldValue, handleSubmit, errors } =
    useFormik({
      initialValues: {
        name: `Сводный_отчёт_по_обратной_магистрали_${moment().format(
          'DD.MM.YYYY',
        )}`,
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
          HouseManagementId: values.houseMangementId,
          OutdoorTemperature: Number(values.temperature),
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
            <ResourceSelect resource={EResourceType.Heat} disabled />
          </FormItem>
          <FormItem label="Температура наружного воздуха">
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
