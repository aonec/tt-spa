import React, { FC, useEffect, useMemo } from 'react';
import {
  ExportReportType,
  GroupReportFormProps,
} from './GroupReportForm.types';
import { Divider, Form, Checkbox } from 'antd';
import { GroupReportRequestPayload } from '../../groupReportService.types';
import { useFormik } from 'formik';
import {
  ReportFormatRadioOptions,
  validationSchema,
} from './GroupReportForm.constants';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import dayjs from 'api/dayjs';
import { RowWrapper, Wrapper } from './GroupReportForm.styled';
import { GroupReportDatesSelect } from './GroupReportDatesSelect';
import { RadioGroupSC } from './GroupReportDatesSelect/GroupReportDatesSelect.styled';
import { LabeledValue } from 'antd/lib/select';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { EReportFormat, EReportType } from 'api/types';
import { SelectMultiple } from 'ui-kit/SelectMultiple';
import { ExportReportTypeTranslatesLookup } from 'services/reportsService/reportViewService/reportViewService.constants';
import { TreeSelect } from 'ui-kit/TreeSelect';
import { prepareAddressesTreeData } from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.utils';

const withoutHouseMagement = 'withoutHouseMagement';

export const GroupReportForm: FC<GroupReportFormProps> = ({
  formId,
  handleDownload,
  reportFilters,
  organizations,
  addressesWithHouseManagements,
  houseManagements,
}) => {
  const {
    groupReports,
    nodeResourceTypes,
    nodeStatuses,
    // contractors // todo: регулярная выгрузка
  } = reportFilters;

  const { values, setFieldValue, handleSubmit, errors } = useFormik<
    Partial<GroupReportRequestPayload> & { exportType: ExportReportType | null } //  & { isRegular: boolean }  // todo: регулярная выгрузка
  >({
    initialValues: {
      exportType: null,
      ManagementFirmId: null,
      HouseManagementId: null,
      BuildingIds: [],
      FileName: `Групповой_отчёт_${dayjs().format('DD.MM.YYYY')}`,
      ReportType: EReportType.Hourly,
      From: dayjs().startOf('month').format(),
      To: dayjs().endOf('day').format(),
      // isRegular: false,  // todo: регулярная выгрузка
      ReportFormat: EReportFormat.Consumption,
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const {
        //  isRegular, // todo: регулярная выгрузка
        ...payload
      } = values;

      handleDownload({
        ...payload,
        From: dayjs(values.From).format('YYYY-MM-DD'),
        To: dayjs(values.To).format('YYYY-MM-DD'),
      });
    },
  });

  const addressesTreeData = prepareAddressesTreeData(
    addressesWithHouseManagements,
    null,
  );

  const groupReportsOptions = useMemo(
    () => [
      {
        label: 'Без домоуправления',
        value: withoutHouseMagement,
        key: withoutHouseMagement,
      },
      ...(groupReports || []).reduce((acc, elem) => {
        if (!elem.houseManagementId) {
          return acc;
        }
        return [
          ...acc,
          {
            value: elem.houseManagementId,
            key: elem.houseManagementId,
            label: elem.title || '',
          },
        ];
      }, [] as LabeledValue[]),
    ],
    [groupReports],
  );

  const nodeResourceTypesOptions = useMemo(
    () =>
      (nodeResourceTypes || []).reduce((acc, elem) => {
        if (!elem.key) {
          return acc;
        }
        return [
          ...acc,
          {
            value: elem.key,
            key: elem.key,
            label: elem.value || '',
          },
        ];
      }, [] as LabeledValue[]),
    [nodeResourceTypes],
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

  // todo: регулярная выгрузка
  // const handleChangeContractorIds = useCallback(
  //   (ids?: number[]) => setFieldValue("['Subscription.ContractorIds']", ids),
  //   [setFieldValue],
  // );
  // const handleChangeEmail = useCallback(
  //   (email?: string) => setFieldValue("['Subscription.Email']", email),
  //   [setFieldValue],
  // );
  // const handleChangeSubsType = useCallback(
  //   (type?: EEmailSubscriptionType) =>
  //     setFieldValue("['Subscription.Type']", type),
  //   [setFieldValue],
  // );
  // const handleThriggerAt = useCallback(
  //   (date?: string) => setFieldValue("['Subscription.TriggerAt']", date),
  //   [setFieldValue],
  // );

  // const handleChangeIsRegular = useCallback(
  //   (isRegular: boolean) => setFieldValue('isRegular', isRegular),
  //   [setFieldValue],
  // );

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      {/* <FormItem label="Группа">
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
          options={groupReportsOptions}
        />
      </FormItem> */}

      <Wrapper>
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
              value={values.ManagementFirmId}
              onChange={(id) => {
                setFieldValue('ManagementFirmId', id);
                setFieldValue('HouseManagementId', null);
                setFieldValue('BuildingIds', []);
              }}
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
              value={values.HouseManagementId}
              placeholder="Выберите из списка"
              onChange={(value) => {
                setFieldValue('HouseManagementId', value || null);
                setFieldValue('ManagementFirmId', null);
                setFieldValue('BuildingIds', []);
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
              value={values.BuildingIds}
              onChange={(buildingIds) => {
                setFieldValue('BuildingIds', buildingIds);
                setFieldValue('HouseManagementId', null);
                setFieldValue('ManagementFirmId', null);
              }}
            />
          </FormItem>
        )}
      </Wrapper>

      <FormItem label="Название отчёта">
        <Input
          value={values.FileName}
          onChange={(e) => setFieldValue('FileName', e.currentTarget.value)}
        />
        <ErrorMessage>{errors.FileName}</ErrorMessage>
      </FormItem>
      <RowWrapper>
        <FormItem label="Ресурс">
          <SelectMultiple
            value={values.NodeResourceTypes}
            onChange={(value) => setFieldValue('NodeResourceTypes', value)}
            options={nodeResourceTypesOptions}
            placeholder="Выберите из списка"
          />
          <ErrorMessage>{errors.NodeResourceTypes}</ErrorMessage>
        </FormItem>

        <FormItem label="Категория узлов">
          <Select
            value={values.NodeStatus || 'All'}
            onChange={(value) => {
              if (value === 'All') {
                return setFieldValue('NodeStatus', undefined);
              }
              setFieldValue('NodeStatus', value);
            }}
          >
            {(nodeStatuses || []).map((elem) => {
              const key = elem.key || 'All';
              return (
                <Select.Option value={key} key={key}>
                  {elem.value || ''}
                </Select.Option>
              );
            })}
          </Select>
        </FormItem>
      </RowWrapper>

      <RowWrapper>
        <FormItem label="Период">
          <GroupReportDatesSelect
            value={{ From: values.From, To: values.To }}
            setValue={({ From, To }) => {
              setFieldValue('From', From);
              setFieldValue('To', To);
            }}
          />
        </FormItem>
        <FormItem label="Детализация отчёта">
          <RadioGroupSC
            options={ReportFormatRadioOptions}
            onChange={(e) => setFieldValue('ReportType', e.target.value)}
            value={values.ReportType}
          />
        </FormItem>
      </RowWrapper>

      <Divider type="horizontal" />

      {/* // todo: регулярная выгрузка */}
      {/* <RegularUnloading
        handleChangeContractorIds={handleChangeContractorIds}
        handleChangeEmail={handleChangeEmail}
        handleChangeSubsType={handleChangeSubsType}
        handleThriggerAt={handleThriggerAt}
        handleChangeIsRegular={handleChangeIsRegular}
        contractors={contractors || []}
        values={{
          'Subscription.ContractorIds': values['Subscription.ContractorIds'],
          'Subscription.Email': values['Subscription.Email'],
          'Subscription.TriggerAt': values['Subscription.TriggerAt'],
          'Subscription.Type': values['Subscription.Type'],
          isRegular: values.isRegular,
        }}
        errors={errors}
      /> */}

      <Checkbox
        checked={values.ReportFormat === EReportFormat.Rso}
        onChange={(value) =>
          setFieldValue(
            'ReportFormat',
            value.target.checked
              ? EReportFormat.Rso
              : EReportFormat.Consumption,
          )
        }
      >
        Выгрузка отчета с кодами НС
      </Checkbox>
    </Form>
  );
};
