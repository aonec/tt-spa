import React, { FC } from 'react';
import { Form, Radio, Space } from 'antd';
import { useFormik } from 'formik';
import {
  PeriodPickerWrapprer,
  ResourceOption,
  Wrapper,
} from './ReportFiltrationForm.styled';
import {
  ReportDatePeriod,
  ReportFiltrationFormProps,
  ReportFiltrationFormValues,
} from './ReportFiltrationForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { SearchIcon } from 'ui-kit/icons';
import { reportViewService } from 'services/reportsService/reportViewService/reportViewService.model';
import { getAddresses } from './ReportFiltrationForm.utils';
import { SelectMultiple } from 'ui-kit/SelectMultiple';
import { EIndividualDeviceReportOption, EResourceType } from 'myApi';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { ResourceShortNamesDictionary } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodesGroup.constants';
import { ReportOptionsDictionary } from 'dictionaries';
import { RangePicker } from 'ui-kit/RangePicker';

const { gates } = reportViewService;
const { HouseManagementsGate } = gates;

export const ReportFiltrationForm: FC<ReportFiltrationFormProps> = ({
  existingCities,
  houseManagements,
  addressesWithHouseManagements,
  filtrationValues,
  formId,
  setFiltrationValues,
}) => {
  const {
    values,
    setFieldValue,
    handleSubmit,
  } = useFormik<ReportFiltrationFormValues>({
    initialValues: filtrationValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setFiltrationValues(values);
    },
  });

  const addresses = getAddresses(
    addressesWithHouseManagements,
    values.houseManagement
  );

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <HouseManagementsGate />
      <div>
        <Wrapper>
          <FormItem label="Город">
            <Select
              suffixIcon={<SearchIcon />}
              placeholder="Выберите из списка"
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
          <FormItem label="Домоуправление">
            <Select
              value={values.houseManagement || undefined}
              suffixIcon={<SearchIcon />}
              placeholder="Выберите из списка"
              onChange={(value) => {
                setFieldValue('houseManagement', value || null);
                setFieldValue('housingStockId', null);
              }}
              allowClear
            >
              {houseManagements?.map((houseManagement) => (
                <Select.Option
                  key={houseManagement.id}
                  value={houseManagement.id}
                >
                  {houseManagement.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Адрес">
            <Select
              value={values.housingStockId || undefined}
              suffixIcon={<SearchIcon />}
              placeholder="Выберите адреса из списка"
              onChange={(value) => setFieldValue('housingStockId', value)}
            >
              {addresses.map((address) => (
                <Select.Option key={address.id} value={address.id}>
                  {address.addressString}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Ресурс">
            <SelectMultiple
              placeholder="Выбраны все ресурсы"
              value={values.resource || undefined}
              onChange={(value) => setFieldValue('resource', value)}
            >
              {Object.values(EResourceType).map((resource) => (
                <SelectMultiple.Option key={resource} value={resource}>
                  <ResourceOption>
                    <ResourceIconLookup resource={resource} />
                    <div>{ResourceShortNamesDictionary[resource]}</div>
                  </ResourceOption>
                </SelectMultiple.Option>
              ))}
            </SelectMultiple>
          </FormItem>
          <FormItem label="Вид отчета">
            <Select
              placeholder="Выберите из списка"
              value={values.reportOption || undefined}
              onChange={(value) => setFieldValue('reportOption', value)}
            >
              {Object.values(EIndividualDeviceReportOption).map(
                (reportOption) => (
                  <Select.Option key={reportOption} value={reportOption}>
                    {ReportOptionsDictionary[reportOption]}
                  </Select.Option>
                )
              )}
            </Select>
          </FormItem>
        </Wrapper>
        <FormItem label="Период">
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={ReportDatePeriod.LastDay}>Последние сутки</Radio>
              <Radio value={ReportDatePeriod.LastSevenDays}>
                Последние 7 дней
              </Radio>
              <Radio value={ReportDatePeriod.FromStartOfMonth}>
                С начала месяца
              </Radio>
              <Radio value={ReportDatePeriod.PreviousMonth}>
                За прошлый месяц
              </Radio>
              <Radio value={ReportDatePeriod.AnyPeriod}>
                Произвольный период
              </Radio>
            </Space>
          </Radio.Group>
        </FormItem>
        <PeriodPickerWrapprer>
          <RangePicker
            value={[values.from, values.to]}
            onChange={(dates) => {
              setFieldValue('from', dates?.[0]);
              setFieldValue('to', dates?.[1]);
            }}
          />
        </PeriodPickerWrapprer>
      </div>
    </Form>
  );
};
