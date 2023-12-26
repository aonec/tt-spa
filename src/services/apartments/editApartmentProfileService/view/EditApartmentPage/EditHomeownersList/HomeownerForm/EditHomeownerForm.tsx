import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Checkbox, Form } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PersonTypeDictionary } from 'services/apartments/apartmentProfileService/view/ApartmentProfile/HomeownersList/HomeownersList.constants';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import {
  formInitialValues,
  validationSchema,
} from './EditHomeownerForm.constants';
import { CheckBoxWrapper, FirstLineWrapper } from './EditHomeownerForm.styled';
import { EditHomeownerFormProps } from './EditHomeownerForm.types';

export const EditHomeownerForm: FC<EditHomeownerFormProps> = ({
  formId,
  initialValues,
  handleCreateHomeowner,
  handleEditHomeownerPreparation,
  isEdit,
}) => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const { values, handleChange, setFieldValue, handleSubmit, errors } =
    useFormik({
      initialValues: initialValues || formInitialValues,
      onSubmit: (values) => {
        // isEdit &&
        //   handleEditHomeownerPreparation &&
        //   handleEditHomeownerPreparation({
        //     personalAccountNumber: values.personalAccountNumber,
        //     name: values.name,
        //     personType: values.personType,
        //     paymentCode: values.paymentCode,
        //     isMainOnApartment: values.isMainOnApartment,
        //     openAt: values.openAt,
        //   });

        handleCreateHomeowner &&
          handleCreateHomeowner({
            apartmentId: Number(apartmentId),
            personalAccountNumber: values.personalAccountNumber,
            name: values.name,
            phoneNumbers: values.phoneNumbers,
            personType: values.personType || undefined,
            paymentCode: values.paymentCode || null,
            openAt: values.openAt?.toISOString()!,
            isMainOnApartment: values.isMainOnApartment,
          });
      },
      validationSchema: validationSchema,
      validateOnChange: false,
    });

  return (
    <Form id={formId} onSubmitCapture={() => handleSubmit()}>
      <FirstLineWrapper>
        <FormItem label="Собственник">
          <Input
            value={values.name}
            name="name"
            onChange={handleChange}
            placeholder="Введите ФИО"
          />
          <ErrorMessage>{errors.name}</ErrorMessage>
        </FormItem>
        <FormItem label="Лицевой счет">
          <Input
            value={values.personalAccountNumber}
            name="personalAccountNumber"
            onChange={handleChange}
            placeholder="Введите номер л/с"
          />
          <ErrorMessage>{errors.personalAccountNumber}</ErrorMessage>
        </FormItem>
        <FormItem label="Платежный код">
          <Input
            value={values.paymentCode}
            name="paymentCode"
            onChange={handleChange}
            placeholder="Введите платежный код"
          />
          <ErrorMessage>{errors.paymentCode}</ErrorMessage>
        </FormItem>
        <FormItem label="Телефон">
          {/* <Input
            value={values.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            placeholder="Введите телефон"
          /> */}
        </FormItem>
        <FormItem label="Дата открытия лицевого счета">
          {!isEdit && (
            <>
              <DatePicker
                value={values.openAt}
                onChange={(date) => setFieldValue('openAt', date)}
                format="DD.MM.YYYY"
              />
              <ErrorMessage>{errors.openAt}</ErrorMessage>
            </>
          )}

          {isEdit && (
            <DatePicker disabled value={values.openAt} format="DD.MM.YYYY" />
          )}
        </FormItem>
        <FormItem label="Юридическое состояние">
          <Select
            value={values.personType || undefined}
            onChange={(type) => setFieldValue('personType', type)}
            placeholder="Выберите"
          >
            {Object.entries(PersonTypeDictionary).map(([key, value]) => (
              <Select.Option key={key} value={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </FirstLineWrapper>
      <CheckBoxWrapper>
        <Checkbox
          checked={values.isMainOnApartment}
          onChange={(e) => setFieldValue('isMainOnApartment', e.target.checked)}
        >
          Основной собственник квартиры
        </Checkbox>
      </CheckBoxWrapper>
    </Form>
  );
};
