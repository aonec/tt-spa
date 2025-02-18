import React, { FC, useCallback, useEffect, useMemo } from 'react';
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
import {
  RowWrapper,
  TreeSelectMultiple,
  Wrapper,
} from './GroupReportForm.styled';
import { GroupReportDatesSelect } from './GroupReportDatesSelect';
import { RadioGroupSC } from './GroupReportDatesSelect/GroupReportDatesSelect.styled';
import { LabeledValue } from 'antd/lib/select';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import {
  EReportFormat,
  EReportType,
  GroupReportConfigurationSendingPeriodType,
} from 'api/types';
import { SelectMultiple } from 'ui-kit/SelectMultiple';
import { ExportReportTypeTranslatesLookup } from 'services/reportsService/reportViewService/reportViewService.constants';
import { prepareAddressesTreeData } from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.utils';
import { RegularUnloading } from './RegularUnloading';
import { omit } from 'lodash';

const withoutHouseMagement = 'withoutHouseMagement';

export const GroupReportForm: FC<GroupReportFormProps> = ({
  formId,
  handleDownload,
  reportFilters,
  organizations,
  addressesWithHouseManagements,
  houseManagements,
  setRegularUpload,
  staffList,
}) => {
  const { nodeResourceTypes, nodeStatuses, contractors } = reportFilters;

  const { values, setFieldValue, handleSubmit, errors, setValues } = useFormik<
    Partial<GroupReportRequestPayload> & {
      exportType: ExportReportType | null;
    } & { isRegular: boolean }
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
      isRegular: false,
      ReportFormat: EReportFormat.Consumption,
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      handleDownload({
        ...omit(values, 'isRegular'),
        From: dayjs(values.From).format('YYYY-MM-DD'),
        To: dayjs(values.To).format('YYYY-MM-DD'),
      });
    },
  });

  const addressesTreeData = prepareAddressesTreeData(
    addressesWithHouseManagements,
    null,
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

      setFieldValue('ManagementFirmId', singularOrganization.id);
    }
  }, [organizations, setFieldValue, values.exportType]);

  const handleChangeEmail = useCallback(
    (emailsHash: string[]) => {
      const onlyEmails = emailsHash.map((hash) => hash.split('@@')[0]);

      const selectedContractorsId =
        contractors
          ?.filter(
            (contractor) =>
              contractor.email && onlyEmails.includes(contractor.email),
          )
          .map((contractor) => contractor.id) || [];

      const selectedStaffId =
        staffList?.items
          ?.filter((staff) => staff.email && onlyEmails.includes(staff.email))
          .map((staff) => staff.id) || [];

      setFieldValue("['Subscription.OrganizationUserIds']", selectedStaffId);
      setFieldValue("['Subscription.ContractorIds']", selectedContractorsId);
    },

    [setFieldValue, contractors, staffList],
  );

  const handleChangeSubsType = useCallback(
    (type?: GroupReportConfigurationSendingPeriodType) =>
      setFieldValue("['Subscription.Type']", type),
    [setFieldValue],
  );
  const handleThriggerAt = useCallback(
    (date?: string) => setFieldValue("['Subscription.TriggerAt']", date),
    [setFieldValue],
  );

  const handleChangeIsRegular = useCallback(
    (isRegular: boolean) => setFieldValue('isRegular', isRegular),
    [setFieldValue],
  );

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
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
                setValues({
                  ...values,
                  ManagementFirmId: id as number,
                  HouseManagementId: null,
                  BuildingIds: [],
                });
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
                setValues({
                  ...values,
                  HouseManagementId: value as string,
                  ManagementFirmId: null,
                  BuildingIds: [],
                });
              }}
              allowClear
            >
              <Select.Option key={withoutHouseMagement} value={'null'}>
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
          </FormItem>
        )}
        {values.exportType === ExportReportType.Address && (
          <FormItem label="Адрес">
            <TreeSelectMultiple
              multiple
              treeData={addressesTreeData}
              placeholder="Выберите адрес"
              value={values.BuildingIds}
              onChange={(buildingIds) => {
                setValues({
                  ...values,
                  BuildingIds: buildingIds as number[],
                  ManagementFirmId: null,
                  HouseManagementId: null,
                });
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
            showSearch={false}
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
            isDisabled={values.isRegular}
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

      <Divider type="horizontal" />

      <RegularUnloading
        handleChangeSubsType={handleChangeSubsType}
        handleThriggerAt={handleThriggerAt}
        handleChangeIsRegular={handleChangeIsRegular}
        contractors={contractors || []}
        values={{
          'Subscription.OrganizationUserIds':
            values['Subscription.OrganizationUserIds'],
          'Subscription.ContractorIds': values['Subscription.ContractorIds'],
          'Subscription.TriggerAt': values['Subscription.TriggerAt'],
          'Subscription.Type': values['Subscription.Type'],

          isRegular: values.isRegular,
        }}
        errors={errors}
        setRegularUpload={setRegularUpload}
        staffList={staffList?.items || []}
        handleChangeEmail={handleChangeEmail}
      />
    </Form>
  );
};
