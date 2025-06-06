import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  FlexContainer,
  GridContainer,
  GridContainerOwner,
  InputSC,
  PersonalNumberWrapper,
  SwitchWrapper,
  Wrapper,
} from './SwitchStage.styled';
import { SwitchStageProps } from './SwitchStage.types';
import { FormItem } from 'ui-kit/FormItem';
import { DatePickerNative } from 'ui-kit/shared/DatePickerNative';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Input } from 'ui-kit/Input';
import { Switch } from 'antd';
import dayjs from 'api/dayjs';
import { PhoneNumberFormField } from 'services/homeowner/personalNumber/components/PersonalNumberForm/PhoneNumberFormField';

export const SwitchStage: FC<SwitchStageProps> = ({
  homeowner,
  handleSubmitSwitchStage,
  switchStageData,
  formId,
}) => {
  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      name: switchStageData?.form.name || '',
      phoneNumbers: switchStageData?.form.phoneNumbers || [],
      openAt: switchStageData?.form.openAt || '',
      personalAccountNumber: switchStageData?.form.personalAccountNumber || '',
      paymentCode: switchStageData?.form.paymentCode || '',
      isMainOnApartment: switchStageData?.form.isMainOnApartment || false,
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
      if (homeowner?.personalAccountNumber) {
        handleSubmitSwitchStage({
          form: {
            personalAccountNumber: data.personalAccountNumber,
            name: data.name,
            phoneNumbers: data.phoneNumbers,
            openAt: data.openAt,
            isMainOnApartment: data.isMainOnApartment,
            paymentCode: data.paymentCode,
          },
          replaceableAccountId: homeowner?.id,
        });
      }
    },
  });

  return (
    <Wrapper onSubmitCapture={handleSubmit} id={formId}>
      <PersonalNumberWrapper>
        <InputSC
          disabled
          value={homeowner?.personalAccountNumber || undefined}
        />
      </PersonalNumberWrapper>
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
    </Wrapper>
  );
};
