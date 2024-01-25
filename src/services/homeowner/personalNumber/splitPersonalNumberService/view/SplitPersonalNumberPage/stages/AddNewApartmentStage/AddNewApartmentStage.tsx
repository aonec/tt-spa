import React, { FC } from 'react';
import {
  AddressGridContainer,
  FlexContainer,
  GridContainer,
  GridContainerOwner,
  SwitchWrapper,
} from './AddNewApartmentStage.styled';
import { AddNewApartmentStageProps } from './AddNewApartmentStage.types';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Form } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { DatePickerNative } from 'ui-kit/shared/DatePickerNative';
import { Switch } from 'antd';
import dayjs from 'api/dayjs';
import { PhoneNumberFormField } from 'services/homeowner/personalNumber/components/PersonalNumberForm/PhoneNumberFormField';

export const AddNewApartmentStage: FC<AddNewApartmentStageProps> = ({
  apartment,
  formId,
  handleSubmitAddNewApartmentStage,
  addNewApartmentStageData,
}) => {
  const address = apartment?.housingStock?.address?.mainAddress;

  const apartmentId = apartment?.id;

  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      apartmentNumber: addNewApartmentStageData?.apartmentNumber || null,
      name: addNewApartmentStageData?.name || '',
      phoneNumbers: addNewApartmentStageData?.phoneNumbers || [],
      openAt: addNewApartmentStageData?.openAt || '',
      personalAccountNumber:
        addNewApartmentStageData?.personalAccountNumber || '',
      paymentCode: addNewApartmentStageData?.paymentCode || '',
      isMainOnApartment: addNewApartmentStageData?.isMainOnApartment || false,
    },
    validationSchema: yup.object().shape({
      apartmentNumber: yup.string().nullable().required('Это поле обязательно'),
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
      apartmentId &&
        data.apartmentNumber &&
        handleSubmitAddNewApartmentStage({
          apartmentNumber: data.apartmentNumber,
          personalAccountNumber: data.personalAccountNumber,
          name: data.name,
          phoneNumbers: data.phoneNumbers,
          openAt: data.openAt,
          isMainOnApartment: data.isMainOnApartment,
          paymentCode: data.paymentCode,
          apartmentId: apartmentId,
        });
    },
  });

  return (
    <>
      <Form onSubmitCapture={handleSubmit} id={formId}>
        <AddressGridContainer>
          <FormItem label="Улица">
            <Input value={address?.street || undefined} disabled />
          </FormItem>
          <FormItem label="Дом">
            <Input value={address?.number || undefined} disabled />
          </FormItem>
          <FormItem label="Квартира">
            <Input
              value={values.apartmentNumber || undefined}
              onChange={(value) =>
                setFieldValue('apartmentNumber', value.target.value)
              }
            />
            <ErrorMessage>{errors.apartmentNumber}</ErrorMessage>
          </FormItem>
        </AddressGridContainer>
      </Form>

      <FormItem label="Дата открытия лицевого счета">
        <DatePickerNative
          value={values.openAt}
          onChange={(value) =>
            setFieldValue('openAt', dayjs(value).format('YYYY-MM-DD'))
          }
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
            deletePhoneNumber={(oldPhoneNumber) =>
              setFieldValue(
                'phoneNumbers',
                (values.phoneNumbers || []).filter(
                  (elem) => elem !== oldPhoneNumber,
                ),
              )
            }
            addPhoneNumber={(phone) =>
              setFieldValue('phoneNumbers', [
                ...(values.phoneNumbers || []),
                phone,
              ])
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
          <Switch checked={values.isMainOnApartment} />
          Основной лицевой счет
        </SwitchWrapper>
      </FlexContainer>
    </>
  );
};
