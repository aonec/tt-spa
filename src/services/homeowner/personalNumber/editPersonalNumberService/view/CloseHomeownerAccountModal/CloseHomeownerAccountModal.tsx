import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CloseHomeownerAccountModalProps } from './CloseHomeownerAccountModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { DatePickerNative } from 'ui-kit/shared_components/DatePickerNative';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import {
  AccountNumber,
  GridContainer,
  ModalTitle,
} from './CloseHomeownerAccountModal.styled';
import moment from 'moment';

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
  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      closedAt: '',
      homeownerAccountId: homeowner.id,
    },
    validationSchema: yup.object().shape({
      closedAt: yup.string().required('Это поле обязательно'),
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
      title={
        <>
          <ModalTitle>Вы действительно хотите закрыть лицевой счет?</ModalTitle>
          Номер лицевого счёта:{' '}
          <AccountNumber>{homeowner.personalAccountNumber || ''}</AccountNumber>
        </>
      }
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
              onChange={(value) =>
                setFieldValue(
                  'closedAt',
                  moment(value).startOf('day').format('YYYY-MM-DD'),
                )
              }
            />
            <ErrorMessage>{errors.closedAt}</ErrorMessage>
          </FormItem>
        </GridContainer>
      }
    />
  );
};
