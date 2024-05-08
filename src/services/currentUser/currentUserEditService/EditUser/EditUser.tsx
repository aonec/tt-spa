import React, { FC } from 'react';
import { Props } from './EditUser.types';
import { useNavigate, useParams } from 'react-router-dom';
import { usePhoneMask } from 'hooks/usePhoneMask';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GoBack } from 'ui-kit/shared/GoBack';
import { FormItem } from 'ui-kit/FormItem';
import { SelectMultiple } from 'ui-kit/SelectMultiple';
import { Button } from 'ui-kit/Button';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Input } from 'ui-kit/Input';
import { Footer, FormWrapper, Header } from './EditUser.styled';
import {
  ESecuredIdentityRoleName,
  OrganizationUserUpdateRequest,
} from 'api/types';

export const EditUser: FC<Props> = ({
  user,
  multipleSelectionCompetences,
  multipleSelectionUserRoles,
  handleEdit,
}) => {
  const params = useParams<{ id: string }>();
  const userId = Number(params.id);

  const navigate = useNavigate();
  const onCancel = () => navigate('/currentUserProfile/mainInfo');

  const phoneMask = usePhoneMask();

  const preparedRoleTypes = user?.roles?.map((elem) => elem.key || '');
  const firmCompetencesId = user?.competences?.map((elem) => elem.id);

  const { handleSubmit, errors, setFieldValue, values } = useFormik({
    initialValues: {
      email: user?.email || null,
      firstName: user?.firstName || null,
      lastName: user?.lastName || null,
      middleName: user?.middleName || null,
      cellphone: user?.cellphone || null,
      roleTypes: preparedRoleTypes || null,
      firmCompetencesId: firmCompetencesId || null,
      userId: userId,
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      firstName: yup
        .string()
        .nullable()
        .min(2, 'Минимум два символа')
        .required('Обязательное поле'),
      lastName: yup
        .string()
        .nullable()
        .min(2, 'Минимум два символа')
        .required('Обязательное поле'),
    }),
    validateOnChange: false,
    onSubmit: (data) => {
      const userId = data.userId;
      const form: OrganizationUserUpdateRequest = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        cellphone: data.cellphone,
        roleTypes: data.roleTypes as ESecuredIdentityRoleName[] | null,
        competenceIds: data.firmCompetencesId,
      };

      handleEdit({ userId: userId, form });
    },
  });

  const middlenameIntial = user?.middleName ? `${user?.middleName[0]}. ` : '';
  const firstnameIntial = user?.firstName ? `${user.firstName[0]}. ` : '';
  const lastname = user?.lastName ? `${user?.lastName} ` : '';
  const fullNameInitials = `${lastname}${firstnameIntial}${middlenameIntial}`;

  return (
    <>
      <GoBack />
      <Header>{fullNameInitials} Редактирование </Header>

      <FormWrapper>
        <FormItem label="Фамилия">
          <Input
            name="lastName"
            type="text"
            placeholder="Введите"
            value={values.lastName || undefined}
            onChange={(value) => setFieldValue('lastName', value.target.value)}
          />
          <ErrorMessage>{errors.lastName}</ErrorMessage>
        </FormItem>
        <FormItem label="Имя">
          <Input
            name="firstName"
            type="text"
            placeholder="Введите"
            value={values.firstName || undefined}
            onChange={(value) => setFieldValue('firstName', value.target.value)}
          />
          <ErrorMessage>{errors.firstName}</ErrorMessage>
        </FormItem>
        <FormItem label="Отчество">
          <Input
            name="middleName"
            type="text"
            placeholder="Введите"
            value={values.middleName || undefined}
            onChange={(value) =>
              setFieldValue('middleName', value.target.value)
            }
          />
        </FormItem>
        <FormItem label="Электронная почта">
          <Input
            name="email"
            type="text"
            placeholder="Введите"
            value={values.email || undefined}
            onChange={(value) => setFieldValue('email', value.target.value)}
          />
          <ErrorMessage></ErrorMessage>
        </FormItem>
        <FormItem label="Контактный телефон">
          <Input
            name="cellphone"
            type="tel"
            placeholder="Введите"
            value={
              values.cellphone && values.cellphone?.length > 8
                ? phoneMask.maskValue(values.cellphone || '') || undefined
                : values.cellphone || undefined
            }
            onChange={(value) =>
              setFieldValue(
                'cellphone',
                phoneMask.unmaskedValue(value.target.value),
              )
            }
          />
          <ErrorMessage></ErrorMessage>
        </FormItem>

        <FormItem label="Роль в системе">
          <SelectMultiple
            placeholder="Выберите"
            onChange={(value) => {
              setFieldValue('roleTypes', value);
            }}
            value={values.roleTypes || undefined}
          >
            {multipleSelectionUserRoles?.map((elem, i) => (
              <SelectMultiple.Option value={elem.value || ''} key={elem.value}>
                {elem.label}
              </SelectMultiple.Option>
            ))}
          </SelectMultiple>
        </FormItem>

        <FormItem label="Компетенции">
          <SelectMultiple
            placeholder="Выберите"
            onChange={(value) => setFieldValue('firmCompetencesId', value)}
            value={values.firmCompetencesId || undefined}
          >
            {multipleSelectionCompetences?.map((elem) => (
              <SelectMultiple.Option value={elem.value} key={elem.value}>
                {elem.label}
              </SelectMultiple.Option>
            ))}
          </SelectMultiple>
        </FormItem>

        <Footer>
          <Button onClick={() => handleSubmit()}>Cохранить</Button>
          <Button type="ghost" onClick={onCancel}>
            Отмена
          </Button>
        </Footer>
      </FormWrapper>
    </>
  );
};
