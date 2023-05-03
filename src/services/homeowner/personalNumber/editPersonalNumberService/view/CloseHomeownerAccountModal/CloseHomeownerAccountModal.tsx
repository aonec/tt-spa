import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CloseHomeownerAccountModalProps } from './CloseHomeownerAccountModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { DatePickerNative } from 'ui-kit/shared_components/DatePickerNative';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { GridContainer } from './CloseHomeownerAccountModal.styled';

const formId = 'close-homeowner-account-modal';

export const CloseHomeownerAccountModal: FC<
  CloseHomeownerAccountModalProps
> = ({
  isLoading,
  homeowner,
  isVisible,
  handleCloseHomeownerAccount,
  setVisible,
}) => {
  const title = `Вы действительно хотите закрыть лицевой счет ${
    homeowner.personalAccountNumber || ''
  }?`;

  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      closedAt: homeowner.closedAt || '',
      homeownerAccountId: homeowner.id,
    },
    validationSchema: yup.object().shape({
      closedAt: yup.string().nullable().required('Это поле обязательно'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (data) => {
      handleCloseHomeownerAccount(data);
    },
  });

  return (
    <FormModal
      title={title}
      visible={isVisible}
      onCancel={() => setVisible(false)}
      submitBtnText="Закрыть"
      submitButtonType="danger"
      loading={isLoading}
      onSubmit={handleSubmit}
      formId={formId}
      form={
        <GridContainer>
          <FormItem label="Дата закрытия текущего лицевого счета">
            <DatePickerNative
              value={values.closedAt}
              onChange={(value) => setFieldValue('closedAt', value)}
            />
            <ErrorMessage>{errors.closedAt}</ErrorMessage>
          </FormItem>
        </GridContainer>
      }
    />
  );
};
