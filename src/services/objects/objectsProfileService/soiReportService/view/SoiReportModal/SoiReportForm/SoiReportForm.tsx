import { Form, Radio, Space } from 'antd';
import { useFormik } from 'formik';
import { EResourceType } from 'myApi';
import React, { FC } from 'react';
import { resourcesNamesLookup } from 'services/devices/devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/IndividualDevicesExtendedSearch/IndividualDevicesExtendedSearch.constants';
import {
  ResourceNameWrapper,
  ResourceOptionWrapper,
} from 'services/devices/devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/IndividualDevicesExtendedSearch/IndividualDevicesExtendedSearch.styled';
import { TreeSelectSC } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateResourceDisconnectionForm.styled';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { SoiReportType } from '../../../soiReportService.model.types';
import { CREATE_SOI_REPORT_FORM_ID } from '../SoiReportModal.constants';
import { formInitialValues } from './SoiReportForm.constants';
import { FormGrid } from './SoiReportForm.styled';
import { SoiReportFormProps } from './SoiReportForm.types';
import { getDatePeriod } from './SoiReportForm.utils';

export const SoiReportForm: FC<SoiReportFormProps> = ({
  soiReportType,
  citiesList,
  selectedCity,
  setSelectedCity,
  houseManagements,
  preparedAddresses,
  createSoiReport,
}) => {
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: formInitialValues,
    onSubmit: (values) => {
      if (!values.Period) return;

      const { From, To } = getDatePeriod(values.Period);

      const normativePerPerson = values.NormativePerPerson
        ? Number(values.NormativePerPerson)
        : null;

      createSoiReport({
        ReportName: values.ReportName,
        HouseManagementId: values.HouseManagementId,
        HousingStockId: values.HousingStockId,
        Resource: values.Resource,
        NormativePerPerson: normativePerPerson,
        From,
        To,
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
        </FormItem>
        <FormItem label="Период">
          <Radio.Group
            value={values.Period}
            onChange={(event) => setFieldValue('Period', event.target.value)}
          >
            <Space direction="vertical">
              <Radio value={'month'}>Месяц</Radio>
              <Radio value={'year'}>Год</Radio>
            </Space>
          </Radio.Group>
        </FormItem>
      </FormGrid>
    </Form>
  );
};
