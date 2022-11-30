import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form, Radio, Space } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { EResourceType, ESoiReportPeriod } from 'myApi';
import React, { FC } from 'react';
import { resourcesNamesLookup } from 'services/devices/devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/IndividualDevicesExtendedSearch/IndividualDevicesExtendedSearch.constants';
import {
  ResourceNameWrapper,
  ResourceOptionWrapper,
} from 'services/devices/devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/IndividualDevicesExtendedSearch/IndividualDevicesExtendedSearch.styled';
import { TreeSelectSC } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateResourceDisconnectionForm.styled';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { SoiReportType } from '../../../soiReportService.model.types';
import { CREATE_SOI_REPORT_FORM_ID } from '../SoiReportModal.constants';
import { formInitialValues, validationSchema } from './SoiReportForm.constants';
import { FormGrid } from './SoiReportForm.styled';
import { SoiReportFormProps } from './SoiReportForm.types';

export const SoiReportForm: FC<SoiReportFormProps> = ({
  soiReportType,
  citiesList,
  selectedCity,
  setSelectedCity,
  houseManagements,
  preparedAddresses,
  createSoiReport,
}) => {
  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
  } = useFormik({
    initialValues: formInitialValues,
    validationSchema,
    onSubmit: (values) => {
      if (!values.Period || !values.Date) return;

      const normativePerPerson = values.NormativePerPerson
        ? Number(values.NormativePerPerson)
        : null;

      const date = moment(values.Date).set('day', 15);

      createSoiReport({
        ReportName: values.ReportName,
        HouseManagementId: values.HouseManagementId || undefined,
        HousingStockId: values.HousingStockId || undefined,
        Resource: values.Resource || undefined,
        NormativePerPerson: normativePerPerson || undefined,
        Period:
          values.Period === 'year'
            ? ESoiReportPeriod.Year
            : ESoiReportPeriod.Month,
        Year: date.year(),
        Month: date.month(),
      });
    },
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
            onChange={(city) => setSelectedCity(city as string)}
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
              value={values.HousingStockId || undefined}
              onChange={(value) =>
                setFieldValue('HousingStockId', value || null)
              }
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
              value={values.HouseManagementId || undefined}
              onChange={(value) =>
                setFieldValue('HouseManagementId', value || null)
              }
              placeholder="Выберите домоуправление из списка"
            >
              {houseManagements?.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        )}
        <FormItem label="Тип ресурса">
          <Select
            placeholder="Выберите тип ресурса"
            value={values.Resource || undefined}
            onChange={(value) => setFieldValue('Resource', value || null)}
          >
            {Object.values(EResourceType).map((resource) => (
              <Select.Option key={resource} value={resource}>
                <ResourceOptionWrapper>
                  <ResourceIconLookup resource={resource} />
                  <ResourceNameWrapper>
                    {resourcesNamesLookup[resource]}
                  </ResourceNameWrapper>
                </ResourceOptionWrapper>
              </Select.Option>
            ))}
          </Select>
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
            value={values.Date}
            onChange={(value) => setFieldValue('Date', value)}
            picker={values.Period}
            format={values.Period === 'month' ? 'MMMM YYYY' : 'YYYY'}
            disabledDate={(date) => moment().diff(date) < 0}
          />
        </FormItem>
      </FormGrid>
    </Form>
  );
};
