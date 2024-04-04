import React, { FC, useEffect } from 'react';
import { Checkbox, Form, Radio, Space } from 'antd';
import { useFormik } from 'formik';
import {
  EmployeeReportFormWrapper,
  PeriodPickerWrapprer,
  ResourceOption,
  Wrapper,
} from './ReportFiltrationForm.styled';
import {
  EmployeeReportDatePeriodType,
  EmployeeReportType,
  ReportFiltrationFormProps,
} from './ReportFiltrationForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { reportViewService } from 'services/reportsService/reportViewService/reportViewService.model';
import { prepareAddressesTreeData } from './ReportFiltrationForm.utils';
import { SelectMultiple } from 'ui-kit/SelectMultiple';
import {
  EActResourceType,
  EIndividualDeviceReportOption,
  EResourceType,
} from 'api/types';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import {
  ClosingReasonsDictionary,
  ReportOptionsDictionary,
  ResourceShortNamesDictionary,
} from 'dictionaries';
import { RangePicker } from 'ui-kit/RangePicker';
import {
  EmployeeReportDatePeriodDictionary,
  EmployeeReportDatePeriodTypesDictionary,
  EmployeeReportTypesDictionary,
  ReportPeriodDictionary,
} from './ReportFiltrationForm.constants';
import {
  ReportDatePeriod,
  ReportFiltrationFormValues,
} from 'services/reportsService/reportViewService/reportViewService.types';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import { TreeSelect } from 'ui-kit/TreeSelect';
import { DatePicker } from 'ui-kit/DatePicker';

const { gates, inputs } = reportViewService;
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
  const { values, setFieldValue, handleSubmit, resetForm } =
    useFormik<ReportFiltrationFormValues>({
      initialValues: filtrationValues,
      enableReinitialize: true,
      onSubmit: (values) => {
        setFiltrationValues(values);
      },
    });

  useEffect(() => {
    return inputs.clearFiltrationValues.watch(() => resetForm()).unsubscribe;
  }, [resetForm]);

  const addressesTreeData = prepareAddressesTreeData(
    addressesWithHouseManagements,
    values.houseManagement,
  );

  const isEmployeeReport = reportType === ReportType.Employee;

  const isCallCenterReport =
    values.employeeReportType === EmployeeReportType.CallCenterWorkingReport;

  const employeeReportDatePickerFormat = `${
    values.employeeReportDatePeriodType === EmployeeReportDatePeriodType.Month
      ? 'MMMM'
      : ''
  } YYYY`;

  const employeeReportDatePicker = values.employeeReportDatePeriodType
    ? EmployeeReportDatePeriodDictionary[values.employeeReportDatePeriodType]
    : undefined;

  if (isEmployeeReport) {
    return (
      <Form id={formId} onSubmitCapture={handleSubmit}>
        <EmployeeReportFormWrapper>
          <FormItem label="Вид отчета">
            <Select
              placeholder="Выберите из списка"
              value={values.employeeReportType || undefined}
              onChange={(value) => setFieldValue('employeeReportType', value)}
            >
              {Object.values(EmployeeReportType).map((elem) => (
                <Select.Option key={elem} value={elem}>
                  {EmployeeReportTypesDictionary[elem]}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Период">
            <Select
              placeholder="Выберите из списка"
              value={
                isCallCenterReport
                  ? 'Произвольный период'
                  : values.employeeReportDatePeriodType || undefined
              }
              onChange={(value) =>
                setFieldValue('employeeReportDatePeriodType', value)
              }
              disabled={!values.employeeReportType || isCallCenterReport}
            >
              {Object.values(EmployeeReportDatePeriodType).map((elem) => (
                <Select.Option key={elem} value={elem}>
                  {EmployeeReportDatePeriodTypesDictionary[elem]}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Дата">
            {!isCallCenterReport && (
              <DatePicker
                value={values.employeeReportDate}
                onChange={(value) => setFieldValue('employeeReportDate', value)}
                picker={employeeReportDatePicker}
                format={employeeReportDatePickerFormat}
                disabled={
                  !values.employeeReportType ||
                  !values.employeeReportDatePeriodType
                }
              />
            )}
            {isCallCenterReport && (
              <RangePicker
                value={[values.from, values.to]}
                format="DD.MM.YYYY"
                onChange={(dates) => {
                  setFieldValue('from', dates?.[0]);
                  setFieldValue('to', dates?.[1]);
                }}
              />
            )}
          </FormItem>
        </EmployeeReportFormWrapper>
      </Form>
    );
  }

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

  const isShowClosingReasonsSelect =
    values.reportOption === EIndividualDeviceReportOption.ClosedDevices;

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <HouseManagementsGate City={values.city || undefined} />
      <div>
        <Wrapper>
          <FormItem label="Город">
            <Select
              placeholder="Выберите из списка"
              value={values.city}
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
              value={values.houseManagement}
              placeholder="Выберите из списка"
              onChange={(value) => {
                setFieldValue('houseManagement', value || null);

                const houseManagement = addressesWithHouseManagements.find(
                  (elem) => elem.id === value,
                );

                const selectedHouseManagementHousingStocksIds = (
                  houseManagement?.streets || []
                ).reduce(
                  (acc, street) => [
                    ...acc,
                    ...(street.addresses || []).map((elem) => elem.buildingId),
                  ],
                  [] as number[],
                );

                setFieldValue(
                  'housingStockIds',
                  selectedHouseManagementHousingStocksIds,
                );
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
            <TreeSelect
              treeData={addressesTreeData}
              placeholder="Выберите адрес"
              showCheckedStrategy="SHOW_CHILD"
              maxTagCount={0}
              value={values.housingStockId}
              onChange={(housingStocksId) => {
                setFieldValue('housingStockId', housingStocksId);
              }}
            />
          </FormItem>
          {isShowResourcesField && (
            <FormItem label="Ресурс">
              {!isShowActResourcesSelect && (
                <SelectMultiple
                  showSearch={false}
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
              {isShowClosingReasonsSelect && (
                <FormItem label="Причины закрытия">
                  <SelectMultiple
                    placeholder="Выберите из списка"
                    value={values.closingReasons || undefined}
                    onChange={(value) => setFieldValue('closingReasons', value)}
                  >
                    {Object.entries(ClosingReasonsDictionary).map(
                      ([key, value]) => (
                        <Select.Option key={key} value={key}>
                          {value}
                        </Select.Option>
                      ),
                    )}
                  </SelectMultiple>
                </FormItem>
              )}
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
                  small
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
