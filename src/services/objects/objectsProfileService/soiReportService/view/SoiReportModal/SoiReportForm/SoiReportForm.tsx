import React, { FC } from 'react';
import { Form, Radio, Space } from 'antd';
import { useFormik } from 'formik';
import dayjs from 'api/dayjs';
import _ from 'lodash';
import { ESoiReportPeriod } from 'api/types';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { TreeSelectSC } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateResourceDisconnectionForm.styled';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import {
  CreateSoiReportRequestPayload,
  SoiReportType,
} from '../../../soiReportService.types';
import { CREATE_SOI_REPORT_FORM_ID } from '../SoiReportModal.constants';
import { formInitialValues, validationSchema } from './SoiReportForm.constants';
import { FormGrid } from './SoiReportForm.styled';
import { CreateSoiReportForm, SoiReportFormProps } from './SoiReportForm.types';
import { ResourceSelect } from 'ui-kit/shared/ResourceSelect';

const withoutHouseMagement = 'withoutHouseMagement';

export const SoiReportForm: FC<SoiReportFormProps> = ({
  soiReportType,
  citiesList,
  selectedCity,
  setSelectedCity,
  houseManagements,
  preparedAddresses,
  createSoiReport,
}) => {
  const preparedCreateSoiReport = (data: CreateSoiReportForm) => {
    if (!data.Period || !data.Date) return;

    const normativePerPerson = data.NormativePerPerson
      ? Number(data.NormativePerPerson)
      : null;

    const date = data.Date;

    const chosenBuilding = preparedAddresses
      .flatMap((addressStreet) => addressStreet.children)
      .find(
        (preparedAddress) => preparedAddress?.value === data.HousingStockIdHash,
      );

    const buildingId = chosenBuilding?.buildingId;

    const preparedData = {
      ReportName: data.ReportName,
      HouseManagementId: data.HouseManagementId,
      HousingStockId: buildingId,
      Resource: data.Resource,
      NormativePerPerson: normativePerPerson,
      Period:
        data.Period === 'year' ? ESoiReportPeriod.Year : ESoiReportPeriod.Month,
      Year: date.year(),
      Month: Number(date.format('MM')),
    };

    const filteredData = _.omitBy(
      preparedData,
      _.isNil,
    ) as CreateSoiReportRequestPayload;

    createSoiReport(filteredData);
  };

  const { values, handleSubmit, handleChange, setFieldValue, errors } =
    useFormik({
      initialValues: formInitialValues,
      validationSchema,
      onSubmit: (data) => preparedCreateSoiReport(data),
    });

  return (
    <Form id={CREATE_SOI_REPORT_FORM_ID} onSubmitCapture={handleSubmit}>
      <FormItem label="Название отчёта">
        <Input
          value={values.ReportName}
          onChange={handleChange}
          name="ReportName"
          placeholder="Введите название отчёта"
        />
        <ErrorMessage>{errors.ReportName}</ErrorMessage>
      </FormItem>
      <FormGrid>
        <FormItem label="Город">
          <Select
            value={selectedCity || undefined}
            onChange={(city) => {
              setSelectedCity(city as string);
              setFieldValue('HousingStockId', null);
            }}
            placeholder="Выберите город"
          >
            {citiesList?.map((city) => (
              <Select.Option key={city} value={city}>
                {city}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        {soiReportType === SoiReportType.Address && (
          <FormItem label="Адрес">
            <TreeSelectSC
              placeholder="Выберите из списка"
              value={values.HousingStockIdHash || undefined}
              onChange={(value) => {
                setFieldValue('HousingStockIdHash', value || null);
              }}
              showSearch
              showArrow
              treeCheckable={false}
              treeData={preparedAddresses}
            />
          </FormItem>
        )}
        {soiReportType === SoiReportType.HouseManagement && (
          <FormItem label="Домоуправление">
            <Select
              value={
                values.HouseManagementId === null
                  ? withoutHouseMagement
                  : values.HouseManagementId || undefined
              }
              onChange={(value) => {
                if (value === withoutHouseMagement) {
                  return setFieldValue('HouseManagementId', null);
                }
                setFieldValue('HouseManagementId', value);
              }}
              placeholder="Выберите домоуправление из списка"
              disabled={!houseManagements || houseManagements?.length === 0}
            >
              <Select.Option value={withoutHouseMagement}>
                Без домоуправления
              </Select.Option>
              {houseManagements?.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        )}
        <FormItem label="Тип ресурса">
          <ResourceSelect
            resource={values.Resource}
            onChange={(value) => setFieldValue('Resource', value || null)}
          />
        </FormItem>
        <FormItem label="Норматив на 1 человека">
          <Input
            value={values.NormativePerPerson}
            onChange={handleChange}
            name="NormativePerPerson"
            placeholder="Выберите норматив"
          />
          <ErrorMessage>{errors.NormativePerPerson}</ErrorMessage>
        </FormItem>
        <FormItem label="Тип периода">
          <Radio.Group
            value={values.Period}
            onChange={(event) => setFieldValue('Period', event.target.value)}
          >
            <Space direction="horizontal">
              <Radio value={'month'}>Месяц</Radio>
              <Radio value={'year'}>Год</Radio>
            </Space>
          </Radio.Group>
        </FormItem>
        <FormItem label="Период">
          <DatePicker
            clearIcon={false}
            value={values.Date}
            onChange={(value) => setFieldValue('Date', value)}
            picker={values.Period}
            format={values.Period === 'month' ? 'MMMM YYYY' : 'YYYY'}
            disabledDate={(date) => dayjs().diff(date) < 0}
          />
        </FormItem>
      </FormGrid>
    </Form>
  );
};
