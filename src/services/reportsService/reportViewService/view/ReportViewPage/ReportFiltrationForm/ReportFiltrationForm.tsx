import React, { FC } from 'react';
import { Checkbox, Form, Radio, Space } from 'antd';
import { useFormik } from 'formik';
import {
  PeriodPickerWrapprer,
  ResourceOption,
  Wrapper,
} from './ReportFiltrationForm.styled';
import { ReportFiltrationFormProps } from './ReportFiltrationForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { reportViewService } from 'services/reportsService/reportViewService/reportViewService.model';
import { getAddresses } from './ReportFiltrationForm.utils';
import { SelectMultiple } from 'ui-kit/SelectMultiple';
import {
  EActResourceType,
  EClosingReason,
  EIndividualDeviceReportOption,
  EResourceType,
} from 'myApi';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  ClosingReasonsDictionary,
  ReportOptionsDictionary,
  ResourceShortNamesDictionary,
} from 'dictionaries';
import { RangePicker } from 'ui-kit/RangePicker';
import { ReportPeriodDictionary } from './ReportFiltrationForm.constants';
import {
  ReportDatePeriod,
  ReportFiltrationFormValues,
} from 'services/reportsService/reportViewService/reportViewService.types';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';

const { gates } = reportViewService;
const { HouseManagementsGate } = gates;

export const ReportFiltrationForm: FC<ReportFiltrationFormProps> = ({
  existingCities,
  houseManagements,
  addressesWithHouseManagements,
  filtrationValues,
  formId,
  setFiltrationValues,
  reportType,
}) => {
  const { values, setFieldValue, handleSubmit } =
    useFormik<ReportFiltrationFormValues>({
      initialValues: filtrationValues,
      enableReinitialize: true,
      onSubmit: (values) => {
        setFiltrationValues(values);
      },
    });

  const addresses = getAddresses(
    addressesWithHouseManagements,
    values.houseManagement,
  );

  const isHomeownersReport = reportType === ReportType.Homeowners;

  const isShowResourcesField = !isHomeownersReport;
  const isShowDatePeriodPicker = !isHomeownersReport;

  const isShowActResourcesSelect = reportType === ReportType.ActsJournal;

  const isIndividualDevicesReport = reportType === ReportType.IndividualDevices;

  const isShowReportOptionSelect = isIndividualDevicesReport;

  const isClosedDevicesReport =
    values.reportOption === EIndividualDeviceReportOption.ClosedDevices;

  const isShowApartmentsWithOpenDevicesCheckbox =
    isIndividualDevicesReport && isClosedDevicesReport;

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <HouseManagementsGate />
      <div>
        <Wrapper>
          <FormItem label="Город">
            <Select
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
              showSearch
              value={values.housingStockId || undefined}
              placeholder="Выберите адреса из списка"
              onChange={(value) => setFieldValue('housingStockId', value)}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {addresses.map((address) => (
                <Select.Option key={address.id} value={address.id}>
                  {address.addressString}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          {isShowResourcesField && (
            <FormItem label="Ресурс">
              {!isShowActResourcesSelect && (
                <SelectMultiple
                  placeholder="Выберите"
                  value={values.resources || undefined}
                  onChange={(value) => setFieldValue('resources', value)}
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
              )}
              {isShowActResourcesSelect && (
                <SelectMultiple
                  placeholder="Выберите"
                  value={values.actResources || undefined}
                  onChange={(value) => setFieldValue('actResources', value)}
                >
                  {Object.values(EActResourceType).map((resource) => (
                    <SelectMultiple.Option key={resource} value={resource}>
                      <ResourceOption>
                        <ResourceIconLookup resource={resource} />
                        <div>{actResourceNamesLookup[resource]}</div>
                      </ResourceOption>
                    </SelectMultiple.Option>
                  ))}
                </SelectMultiple>
              )}
            </FormItem>
          )}
          {isShowReportOptionSelect && (
            <>
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
                    ),
                  )}
                </Select>
              </FormItem>
              <FormItem label="Причины закрытия">
                <SelectMultiple
                  placeholder="Выберите из списка"
                  value={values.closingReasons || undefined}
                  onChange={(value) => setFieldValue('closingReasons', value)}
                >
                  {[
                    EClosingReason.Manually,
                    EClosingReason.DeviceBroken,
                    EClosingReason.CertificateIssued,
                    EClosingReason.ByLetter,
                  ].map((reportOption) => (
                    <Select.Option key={reportOption} value={reportOption}>
                      {ClosingReasonsDictionary[reportOption]}
                    </Select.Option>
                  ))}
                </SelectMultiple>
              </FormItem>
            </>
          )}
          {isHomeownersReport && (
            <FormItem label="Вид отчета по собственникам">
              <Checkbox
                checked={values.showOnlyDuplicates}
                onChange={(e) =>
                  setFieldValue('showOnlyDuplicates', e.target.checked)
                }
              >
                Задвоенные лицевые счета
              </Checkbox>
            </FormItem>
          )}
        </Wrapper>
        <Wrapper>
          {isShowDatePeriodPicker && (
            <div>
              <FormItem label="Период">
                <Radio.Group
                  value={values.reportDatePeriod}
                  onChange={(event) =>
                    setFieldValue('reportDatePeriod', event.target.value)
                  }
                >
                  <Space direction="vertical">
                    {Object.values(ReportDatePeriod).map((period) => (
                      <Radio key={period} value={period}>
                        {ReportPeriodDictionary[period]}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </FormItem>
              <PeriodPickerWrapprer>
                <RangePicker
                  disabled={
                    values.reportDatePeriod !== ReportDatePeriod.AnyPeriod
                  }
                  value={[values.from, values.to]}
                  format="DD.MM.YYYY"
                  onChange={(dates) => {
                    setFieldValue('from', dates?.[0]);
                    setFieldValue('to', dates?.[1]);
                  }}
                />
              </PeriodPickerWrapprer>
            </div>
          )}
          {isShowApartmentsWithOpenDevicesCheckbox && (
            <FormItem>
              <Checkbox
                checked={values.withoutApartmentsWithOpenDevicesByResources}
                onChange={(e) =>
                  setFieldValue(
                    'withoutApartmentsWithOpenDevicesByResources',
                    e.target.checked,
                  )
                }
              >
                Исключить квартиры с открытыми ИПУ по ресурсу
              </Checkbox>
            </FormItem>
          )}
        </Wrapper>
      </div>
    </Form>
  );
};
