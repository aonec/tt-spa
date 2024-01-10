import React, { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'api/dayjs';
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
import { DatePickerNative } from 'ui-kit/shared/DatePickerNative';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Input } from 'ui-kit/Input';
import { TrashIcon } from 'ui-kit/icons';
import { Switch } from 'antd';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { PhoneNumberFormField } from './PhoneNumberFormField';

export const PersonalNumberForm: FC<PersonalNumberFormProps> = ({
  type,
  isMainPersonalAccountNumber,
  formId,
  apartmentId,
  handleAddPersonalNumber,
  handleEditHomeownerAccount,
  homeowner,
  handleForced,
  setVisibleCloseHomeownerAccountModal,
  handleSwitchHomeownerAccount,
  handleSubmitSwitchStage,
  handleSubmitAddNewApartmentStage,
  apartmentNumber,
}) => {
  const isEdit = type === PersonalNumberActions.Edit;
  const isSplit = type === PersonalNumberActions.Split;

  const { values, setFieldValue, errors, handleSubmit } =
    useFormik<PersonalNumberFormTypes>({
      initialValues: {
        name: ((isEdit || isSplit) && homeowner?.name) || '',
        phoneNumbers: (isEdit && homeowner?.phoneNumbers) || [],
        openAt: (isEdit && dayjs(homeowner?.openAt).format('YYYY-MM-DD')) || '',
        personalAccountNumber:
          (isEdit && homeowner?.personalAccountNumber) || '',
        paymentCode: (isEdit && homeowner?.paymentCode) || '',
        isMainOnApartment:
          (isEdit && homeowner?.isMainPersonalAccountNumber) || false,
        apartmentId,
        homeownerId: homeowner?.id,
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
        apartmentId && handleAddPersonalNumber && handleAddPersonalNumber(data);

        data.homeownerId &&
          handleEditHomeownerAccount &&
          handleEditHomeownerAccount(data);

        apartmentId &&
          homeowner &&
          handleSwitchHomeownerAccount &&
          handleSwitchHomeownerAccount({
            form: data,
            replaceableAccountId: homeowner.id,
          });

        homeowner &&
          handleSubmitSwitchStage &&
          handleSubmitSwitchStage({
            form: data,
            replaceableAccountId: homeowner.id,
          });

        apartmentId &&
          apartmentNumber &&
          handleSubmitAddNewApartmentStage &&
          handleSubmitAddNewApartmentStage({
            personalAccountNumber: data.personalAccountNumber,
            name: data.name,
            phoneNumbers: data.phoneNumbers,
            openAt: data.openAt,
            isMainOnApartment: data.isMainOnApartment,
            paymentCode: data.paymentCode,
            apartmentId: apartmentId,
            apartmentNumber,
          });
      },
    });

  useEffect(() => {
    return handleForced?.watch(() => handleSubmit()).unsubscribe;
  }, [handleForced, handleSubmit]);

  return (
    <Wrapper onSubmitCapture={handleSubmit} id={formId}>
      <FormItem label="Дата открытия лицевого счета">
        <DatePickerNative
          value={values.openAt}
          onChange={(value) =>
            setFieldValue('openAt', dayjs(value).format('YYYY-MM-DD'))
          }
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
          <PhoneNumberFormField
            phoneNumbers={values.phoneNumbers || []}
            addPhoneNumber={(phone) =>
              setFieldValue('phoneNumbers', [
                ...(values.phoneNumbers || []),
                phone,
              ])
            }
            deletePhoneNumber={(oldPhoneNumber) =>
              setFieldValue(
                'phoneNumbers',
                (values.phoneNumbers || []).filter(
                  (elem) => elem !== oldPhoneNumber,
                ),
              )
            }
          />
        </FormItem>
      </GridContainerOwner>
      <FlexContainer>
        <SwitchWrapper
          onClick={() =>
            setFieldValue('isMainOnApartment', !values.isMainOnApartment)
          }
        >
          <Switch
            checked={values.isMainOnApartment}
            disabled={isMainPersonalAccountNumber}
          />
          Основной лицевой счет
        </SwitchWrapper>
        {isEdit && (
          <DeleteButton
            onClick={() =>
              setVisibleCloseHomeownerAccountModal &&
              setVisibleCloseHomeownerAccountModal(true)
            }
          >
            <TrashIcon />
            Закрыть лицевой счет
          </DeleteButton>
        )}
      </FlexContainer>
    </Wrapper>
  );
};
