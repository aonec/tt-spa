import React, { FC } from 'react';
import {
  BottomBlock,
  TopBlock,
  TreeSelectMultiple,
  Wrapper,
} from './CreateRunnerModal.styled';
import { FormType, Props } from './CreateRunnerModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { ExportReportType } from 'services/reportsService/reportViewService/reportViewService.types';
import { ExportReportTypeTranslatesLookup } from 'services/reportsService/reportViewService/reportViewService.constants';
import { prepareAddressesTreeData } from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.utils';
import { Form } from 'antd';
import { yearRangeTypeWithLabel } from './CreateRunnerModal.constants';
import { SelectMultiple } from 'ui-kit/SelectMultiple';

const formId = 'Create-Runner-Modal';

export const CreateRunnerModal: FC<Props> = ({
  existingCities,
  organizations,
  houseManagements,
  addressesWithHouseManagements,
  isOpen,
  setOpen,
  handleGenerateReport,
}) => {
  const RunnerForm = () => {
    const { values, submitForm, setFieldValue } = useFormik<FormType>({
      initialValues: {
        city: null,
        exportType: null,
        houseManagementIds: [],
        housingStockIds: [],
        organizationId: null,
        yearRange: null,
      },
      onSubmit: (data) => {
        handleGenerateReport({
          HouseIds: data.housingStockIds || undefined,
          HmIds: data.houseManagementIds || undefined,
          ManagementFirmId: data.organizationId || undefined,
          YearRange: data.yearRange || undefined,
        });
      },
    });

    const addressesTreeData = prepareAddressesTreeData(
      addressesWithHouseManagements,
      null,
    );

    return (
      <Form id={formId} onSubmitCapture={submitForm}>
        <Wrapper>
          <TopBlock>
            {/* <FormItem label="Город">
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
            </FormItem> */}
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
                    <Select.Option
                      key={organization.id}
                      value={organization.id}
                    >
                      {organization.name}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            )}
            {values.exportType === ExportReportType.HouseManagement && (
              <FormItem label="Домоуправление">
                <SelectMultiple
                  value={values.houseManagementIds}
                  placeholder="Выберите из списка"
                  onChange={(value) => {
                    setFieldValue('houseManagementIds', value || null);

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
                </SelectMultiple>
              </FormItem>
            )}
            {values.exportType === ExportReportType.Address && (
              <FormItem label="Адрес">
                <TreeSelectMultiple
                  multiple
                  treeData={addressesTreeData}
                  placeholder="Выберите адрес"
                  // showCheckedStrategy="SHOW_CHILD"
                  // maxTagCount={0}
                  value={values.housingStockIds}
                  onChange={(housingStocksIds) => {
                    setFieldValue('housingStockIds', housingStocksIds);
                  }}
                />
              </FormItem>
            )}
          </TopBlock>
          <BottomBlock>
            <FormItem label="Диапазон значений">
              <Select
                placeholder="Выберите"
                value={values.yearRange}
                onChange={(value) => setFieldValue('yearRange', value)}
              >
                {yearRangeTypeWithLabel.map((rangeType) => (
                  <Select.Option key={rangeType.value} value={rangeType.value}>
                    {rangeType.label}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </BottomBlock>
        </Wrapper>
      </Form>
    );
  };

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
