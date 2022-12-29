import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { ENodeCommercialAccountStatus } from 'myApi';
import React, { FC } from 'react';
import { nodeStatuses } from 'services/nodes/createNodeService/view/CreateNodePage/CommonData/CommonData.contstants';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { validationSchema } from './ChangeNodeStatusForm.constants';
import {
  GroupWrapper,
  SelectOptionWithIconWrapper,
} from './ChangeNodeStatusForm.styled';
import {
  ChangeNodeStatusFormik,
  ChangeNodeStatusFormProps,
} from './ChangeNodeStatusForm.types';

export const ChangeNodeStatusForm: FC<ChangeNodeStatusFormProps> = ({
  formId,
  handleChangeNodeStatus,
  node,
}) => {
  const {
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik<ChangeNodeStatusFormik>({
    initialValues: {
      commercialStatus:
        node.commercialStatus?.value ||
        ENodeCommercialAccountStatus.NotRegistered,
      date: moment().format('YYYY-MM-DD'),
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleChangeNodeStatus,
  });

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GroupWrapper>
        <FormItem label="Статус узла">
          <Select
            placeholder="Выберите"
            value={values.commercialStatus}
            onChange={(value) => setFieldValue('commercialStatus', value)}
          >
            {nodeStatuses.map(({ nodeStatus, text, Icon }) => (
              <Select.Option key={nodeStatus} value={nodeStatus}>
                <SelectOptionWithIconWrapper>
                  <Icon />
                  <div>{text}</div>
                </SelectOptionWithIconWrapper>
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Дата смены статуса">
          <DatePicker
            placeholder="Выберите дату"
            format="DD.MM.YYYY"
            value={getDatePickerValue(values.date)}
            onChange={(date) =>
              setFieldValue('date', date?.format('YYYY-MM-DD'))
            }
          />
        </FormItem>
      </GroupWrapper>
    </Form>
  );
};
