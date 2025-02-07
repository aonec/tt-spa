import { FC, useEffect, useMemo, useState } from 'react';
import {
  FormWrapper,
  Wrapper,
} from './CloseDevicesWithReadingsParamsModal.styled';
import { Props } from './CloseDevicesWithReadingsParamsModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Radio } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { SelectMultiple } from 'ui-kit/SelectMultiple';
import { useFormik } from 'formik';
import { CloseDevicesWithoutReadingsQuery } from 'services/workWithReadings/standartReport/standartReportService.types';

const MONTHS_WITHOUT_READINGS = [3, 4, 6];

export const CloseDevicesWithReadingsParamsModal: FC<Props> = ({
  isOpen,
  handleClose,
  houseManagements,
  organizations,
  onSubmit,
}) => {
  const [view, setView] = useState<'houseManagement' | 'managementFirm'>(
    'houseManagement',
  );

  const { values, setFieldValue, resetForm, handleSubmit } = useFormik({
    initialValues: {
      ExceptedHmIds: [],
      HmIds: [],
      ManagementFirmIds: [],
      MonthsToCloseDevice: 6,
    } as CloseDevicesWithoutReadingsQuery,
    onSubmit: (data) => {
      onSubmit(data);
      handleClose();
    },
  });

  const isAllowSubmit = useMemo(() => {
    if (!values.MonthsToCloseDevice) return false;

    if (view === 'houseManagement') {
      return Boolean(values.HmIds?.length);
    }

    if (view === 'managementFirm') {
      return Boolean(values.ManagementFirmIds?.length);
    }
  }, [values, view]);

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  return (
    <FormModal
      title="Закрыть приборы без показаний"
      formId="checkingDatePoll"
      visible={isOpen}
      submitButtonType="danger"
      submitBtnText="Закрыть приборы"
      disabled={!isAllowSubmit}
      onSubmit={handleSubmit}
      form={
        <Wrapper>
          <FormWrapper>
            <FormItem label="Кол-во месяцев без показаний">
              <Select
                placeholder="Выберите"
                value={values.MonthsToCloseDevice}
                onChange={(value) =>
                  setFieldValue('MonthsToCloseDevice', value)
                }
              >
                {MONTHS_WITHOUT_READINGS.map((elem) => (
                  <Select.Option key={elem} value={elem}>
                    {elem}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </FormWrapper>

          <Radio.Group
            value={view}
            onChange={(e) => setView(e.target.value)}
            options={[
              { value: 'houseManagement', label: 'По домоуправлению' },
              { value: 'managementFirm', label: 'По УК' },
            ]}
          />

          {view === 'houseManagement' && (
            <FormWrapper>
              <FormItem label="Домоуправления">
                <SelectMultiple
                  mode="multiple"
                  placeholder="Выберите"
                  value={values.HmIds}
                  onChange={(value) => setFieldValue('HmIds', value)}
                >
                  {houseManagements?.map((elem) => (
                    <Select.Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Select.Option>
                  ))}
                </SelectMultiple>
              </FormItem>
            </FormWrapper>
          )}

          {view === 'managementFirm' && (
            <FormWrapper>
              <FormItem label="УК">
                <SelectMultiple
                  mode="multiple"
                  placeholder="Выберите"
                  value={values.ManagementFirmIds}
                  onChange={(value) =>
                    setFieldValue('ManagementFirmIds', value)
                  }
                >
                  {organizations?.items?.map((elem) => (
                    <Select.Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Select.Option>
                  ))}
                </SelectMultiple>
              </FormItem>

              <FormItem label="Исключить домоуправления">
                <SelectMultiple
                  mode="multiple"
                  placeholder="Выберите"
                  value={values.ExceptedHmIds}
                  onChange={(value) => setFieldValue('ExceptedHmIds', value)}
                >
                  {houseManagements?.map((elem) => (
                    <Select.Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Select.Option>
                  ))}
                </SelectMultiple>
              </FormItem>
            </FormWrapper>
          )}
        </Wrapper>
      }
      onCancel={handleClose}
    />
  );
};
