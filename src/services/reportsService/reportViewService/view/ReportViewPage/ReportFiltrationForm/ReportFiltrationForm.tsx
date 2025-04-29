import React, { FC, useEffect, useMemo } from 'react';
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
  ReportTemplates,
} from './ReportFiltrationForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { reportViewService } from 'services/reportsService/reportViewService/reportViewService.model';
import {
  getAvailableReportDatePeriod,
  getAvailableResource,
  prepareAddressesTreeData,
} from './ReportFiltrationForm.utils';
import { SelectMultiple } from 'ui-kit/SelectMultiple';
import {
  EActResourceType,
  EActType,
  EIndividualDeviceReportOption,
  EResourceType,
} from 'api/types';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import {
  ActTypeDictionary,
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
  ExportReportType,
  ReportDatePeriod,
  ReportFiltrationFormValues,
} from 'services/reportsService/reportViewService/reportViewService.types';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import { TreeSelect } from 'ui-kit/TreeSelect';
import { DatePicker } from 'ui-kit/DatePicker';
import { ExportReportTypeTranslatesLookup } from 'services/reportsService/reportViewService/reportViewService.constants';
import { useSearchParams } from 'react-router-dom';

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
  organizations,
  setSubmitButtonDisable,
}) => {
  const { values, setFieldValue, handleSubmit, resetForm } =
    useFormik<ReportFiltrationFormValues>({
      initialValues: filtrationValues,
      enableReinitialize: true,
      onSubmit: (values) => {
        setFiltrationValues(values);
      },
    });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const reportTemp = searchParams.get('reportTemp');

    if (!reportTemp) return;

    if (reportTemp === ReportTemplates.CheckingDateExpiration) {
      setFiltrationValues({
        exportType: ExportReportType.ManagementFirm,
        reportDatePeriod: ReportDatePeriod.ExpiresInNextMonth,
        reportOption:
          EIndividualDeviceReportOption.DeviceCheckingDateExpiration,
        resources: [
          EResourceType.HotWaterSupply,
          EResourceType.ColdWaterSupply,
        ],
      });
    }

    if (reportTemp === ReportTemplates.InvalidBitDepth) {
      setFiltrationValues({
        exportType: ExportReportType.ManagementFirm,
        reportDatePeriod: ReportDatePeriod.AnyPeriod,
        reportOption: EIndividualDeviceReportOption.InvalidBitDepth,
      });
    }
  }, [searchParams]);

  const isSubmitButtonActive = useMemo(() => {
    const isAddressSelected = Boolean(
      values.housingStockId || values.organizationId || values.houseManagement,
    );

    if (reportType === ReportType.ActsJournal) {
      return isAddressSelected;
    }
    if (reportType === ReportType.Employee) {
      return Boolean(values.employeeReportType);
    }
    if (reportType === ReportType.Homeowners) {
      return isAddressSelected;
    }
    if (reportType === ReportType.HousingDevices) {
      return (
        isAddressSelected &&
        Boolean((values.from && values.to) || values.reportDatePeriod)
      );
    }
    if (reportType === ReportType.IndividualDevices) {
      const isClosedDeviceOnOneOfRisers =
        values.reportOption ===
        EIndividualDeviceReportOption.ClosedDeviceOnOneOfRisers;

      const isInvalidBitDepth =
        values.reportOption === EIndividualDeviceReportOption.InvalidBitDepth;

      if (isClosedDeviceOnOneOfRisers || isInvalidBitDepth) {
        return isAddressSelected && Boolean(values.reportOption);
      }

      return (
        isAddressSelected &&
        Boolean(values.reportOption) &&
        Boolean(values.reportDatePeriod)
      );
    }

    return false;
  }, [
    reportType,
    values.housingStockId,
    values.organizationId,
    values.houseManagement,
    values.employeeReportType,
    values.from,
    values.to,
    values.reportOption,
    values.reportDatePeriod,
  ]);

  useEffect(() => {
    setSubmitButtonDisable(!isSubmitButtonActive);
  }, [setSubmitButtonDisable, isSubmitButtonActive]);

  const availableResources = useMemo(
    () => getAvailableResource(reportType),
    [reportType],
  );
  const availableReportDatePeriod = useMemo(
    () => getAvailableReportDatePeriod(values.reportOption),
    [values.reportOption],
  );

  useEffect(() => {
    return inputs.clearFiltrationValues.watch(() => resetForm()).unsubscribe;
  }, [resetForm]);

  const addressesTreeData = prepareAddressesTreeData(
    addressesWithHouseManagements,
    values.houseManagement,
  );

  useEffect(() => {
    if (
      organizations?.items?.length === 1 &&
      values.exportType === ExportReportType.ManagementFirm
    ) {
      const singularOrganization = organizations?.items[0];

      setFieldValue('organizationId', singularOrganization.id);
    }
  }, [organizations, setFieldValue, values.exportType]);

  const isClosedDeviceOnOneOfRisers = useMemo(() => {
    return (
      values.reportOption ===
      EIndividualDeviceReportOption.ClosedDeviceOnOneOfRisers
    );
  }, [values.reportOption]);

  const isEmployeeReport = reportType === ReportType.Employee;

  const isActsJournalReport = reportType === ReportType.ActsJournal;

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
                format={{ format: 'DD.MM.YYYY', type: 'mask' }}
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
  const isShowDatePeriodPicker =
    !isHomeownersReport &&
    values.reportOption !== EIndividualDeviceReportOption.InvalidBitDepth;

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
          <FormItem label="Тип выгрузки">
            <Select
              placeholder="Выберите"
              value={values.exportType}
              onChange={(exportType) => {
                setFieldValue('exportType', exportType);
                setFieldValue('houseManagement', null);
                setFieldValue('organizationId', null);
              }}
            >
              {Object.values(ExportReportType).map((reportType) => (
                <Select.Option key={reportType} value={reportType}>
                  {ExportReportTypeTranslatesLookup[reportType]}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          {values.exportType === ExportReportType.ManagementFirm && (
            <FormItem label="Список УК">
              <Select
                placeholder="Выберите"
                value={values.organizationId}
                onChange={(id) => setFieldValue('organizationId', id)}
              >
                {organizations?.items?.map((organization) => (
                  <Select.Option key={organization.id} value={organization.id}>
                    {organization.name}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          )}
          {values.exportType === ExportReportType.HouseManagement && (
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
                      ...(street.addresses || []).map(
                        (elem) => elem.buildingId,
                      ),
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
          )}
          {values.exportType === ExportReportType.Address && (
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
          )}
          {!values.exportType && <div />}
          {isShowResourcesField && (
            <FormItem label="Ресурс">
              {!isShowActResourcesSelect && (
                <SelectMultiple
                  showSearch={false}
                  placeholder="Выберите"
                  value={values.resources || undefined}
                  onChange={(value) => setFieldValue('resources', value)}
                >
                  {availableResources.map((resource) => (
                    <SelectMultiple.Option key={resource} value={resource} di>
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

          {isActsJournalReport && (
            <FormItem label="Тип документа">
              <Select
                placeholder="Выберите из списка"
                value={values.actType || undefined}
                onChange={(value) => setFieldValue('actType', value)}
              >
                {Object.values(EActType).map((actType) => (
                  <Select.Option key={actType} value={actType}>
                    {ActTypeDictionary[actType]}
                  </Select.Option>
                ))}
              </Select>
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
                  disabled={isClosedDeviceOnOneOfRisers}
                >
                  <Space direction="vertical">
                    {availableReportDatePeriod.map((period) => (
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
                    values.reportDatePeriod !== ReportDatePeriod.AnyPeriod ||
                    isClosedDeviceOnOneOfRisers
                  }
                  value={[values.from, values.to]}
                  format={{ format: 'DD.MM.YYYY', type: 'mask' }}
                  onChange={(dates) => {
                    setFieldValue('from', dates?.[0] || null);
                    setFieldValue('to', dates?.[1] || null);
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
