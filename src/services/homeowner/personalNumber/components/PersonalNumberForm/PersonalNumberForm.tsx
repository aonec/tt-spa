import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  DeleteButton,
  FlexContainer,
  GridContainer,
  GridContainerOwner,
  SwitchWrapper,
  Wrapper,
} from './PersonalNumberForm.styled';
import {
  PersonalNumberFormProps,
  PersonalNumberFormTypes,
} from './PersonalNumberForm.types';
import { FormItem } from 'ui-kit/FormItem';
import { DatePickerNative } from 'ui-kit/shared_components/DatePickerNative';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Input } from 'ui-kit/Input';
import { TrashIcon } from 'ui-kit/icons';
import { Switch } from 'antd';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';

export const PersonalNumberForm: FC<PersonalNumberFormProps> = ({
  type,
  isMainPersonalAccountNumber,
  formId,
  handleAddPersonalNumber,
  apartmentId,
  homeownerId,
}) => {
  const isEdit = type === PersonalNumberActions.Edit;

  const { values, setFieldValue, errors, handleSubmit } =
    useFormik<PersonalNumberFormTypes>({
      initialValues: {
        name: '',
        phoneNumber: '',
        openAt: '',
        personalAccountNumber: '',
        paymentCode: '',
        isMainOnApartment: false,
        apartmentId,
        homeownerId,
      },
      validationSchema: yup.object().shape({
        name: yup.string().nullable().required('Это поле обязательно'),
        openAt: yup.string().nullable().required('Это поле обязательно'),
        personalAccountNumber: yup
          .string()
          .nullable()
          .required('Это поле обязательно'),
      }),
      validateOnBlur: false,
      validateOnChange: false,
      enableReinitialize: true,
      onSubmit: (data) => {
        handleAddPersonalNumber && handleAddPersonalNumber(data);
      },
    });

  return (
    <Wrapper onSubmitCapture={handleSubmit} id={formId}>
      <FormItem label="Дата открытия лицевого счета">
        <DatePickerNative
          value={values.openAt}
          onChange={(value) => setFieldValue('openAt', value)}
          disabled={isEdit}
        />
        <ErrorMessage>{errors.openAt}</ErrorMessage>
      </FormItem>
      <GridContainer>
        <FormItem label="Лицевой счет">
          <Input
            placeholder="Введите л/с"
            value={values.personalAccountNumber || undefined}
            onChange={(value) =>
              setFieldValue('personalAccountNumber', value.target.value)
            }
          />
          <ErrorMessage>{errors.personalAccountNumber}</ErrorMessage>
        </FormItem>
        <FormItem label="Платежный код">
          <Input
            type="number"
            value={values.paymentCode || undefined}
            onChange={(value) =>
              setFieldValue('paymentCode', value.target.value)
            }
          />
        </FormItem>
      </GridContainer>
      <GridContainerOwner>
        <FormItem label="Собственник">
          <Input
            placeholder="Введите ФИО"
            value={values.name || undefined}
            onChange={(value) => setFieldValue('name', value.target.value)}
          />
          <ErrorMessage>{errors.name}</ErrorMessage>
        </FormItem>
        <FormItem label="Телефон">
          <Input
            placeholder="Введите телефон"
            value={values.phoneNumber || undefined}
            onChange={(value) =>
              setFieldValue('phoneNumber', value.target.value)
            }
          />
        </FormItem>
      </GridContainerOwner>
      <FlexContainer>
        <SwitchWrapper
          onClick={() =>
            setFieldValue('isMainAccountingNumber', !values.isMainOnApartment)
          }
        >
          <Switch
            checked={values.isMainOnApartment}
            disabled={isMainPersonalAccountNumber}
          />
          Основной лицевой счет
        </SwitchWrapper>
        {isEdit && (
          <DeleteButton onClick={() => {}}>
            <TrashIcon />
            Закрыть лицевой счет
          </DeleteButton>
        )}
      </FlexContainer>
    </Wrapper>
  );
};
