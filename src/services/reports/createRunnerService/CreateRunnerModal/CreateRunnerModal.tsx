import React, { FC } from 'react';
import { Wrapper } from './CreateRunnerModal.styled';
import { Form, Props } from './CreateRunnerModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ExportReportType } from 'services/reportsService/reportViewService/reportViewService.types';
import { ExportReportTypeTranslatesLookup } from 'services/reportsService/reportViewService/reportViewService.constants';
import { TreeSelect } from 'ui-kit/TreeSelect';
import { prepareAddressesTreeData } from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.utils';

const formId = 'Create-Runner-Modal';

export const CreateRunnerModal: FC<Props> = ({
  existingCities,
  organizations,
  houseManagements,
  addressesWithHouseManagements,
  isOpen,
  setOpen,
}) => {
  const RunnerForm = () => {
    const { values, submitForm, setFieldValue, setValues } = useFormik<Form>({
      initialValues: {
        city: null,
        exportType: null,
        houseManagement: null,
        housingStockId: null,
        organizationId: null,
      },
      onSubmit: (values) => {},
    });

    const addressesTreeData = prepareAddressesTreeData(
      addressesWithHouseManagements,
      values.houseManagement,
    );

    return (
      <>
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
      </>
    );
  };

  console.log(isOpen)

  return (
    <FormModal
      visible={isOpen}
      onCancel={() => setOpen(false)}
      title="Сформировать бегунок"
      submitBtnText="Сформировать"
      formId={formId}
      form={<RunnerForm />}
    />
  );
};
