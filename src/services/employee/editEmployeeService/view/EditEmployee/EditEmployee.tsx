import React, { FC } from 'react';
import { Footer, FormWrapper, Header } from './EditEmployee.styled';
import { EditEmployeeProps } from './EditEmployee.types';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { useFormik } from 'formik';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Button } from 'ui-kit/Button';
import { useHistory, useParams } from 'react-router-dom';
import { Loader } from '01/_components/Loader';
import { ESecuredIdentityRoleName, OrganizationUserUpdateRequest } from 'myApi';
import { Select } from 'ui-kit/Select';

export const EditEmployee: FC<EditEmployeeProps> = ({
  submitHandler,
  isPending,
  multipleSelectionCompetences,
  multipleSelectionUserRoles,
  employeeData,
}) => {
  const params = useParams<{ id: string }>();
  const userId = Number(params.id);

  const history = useHistory();
  const onCancel = () => history.push('/companyProfile/staff');

  const { handleSubmit, errors, setFieldValue, values } = useFormik({
    initialValues: {
      email: employeeData?.email || null,
      firstName: employeeData?.firstName || null,
      lastName: employeeData?.lastName || null,
      middleName: employeeData?.middleName || null,
      cellphone: employeeData?.cellphone || null,
      roleTypes: employeeData?.roles || null,
      firmCompetences: employeeData?.competences || null,
      userId: userId,
    },
    validationSchema: {},
    enableReinitialize: true,
    onSubmit: (data) => {
      const userId = data.userId;
      const form: OrganizationUserUpdateRequest = {};

      submitHandler({ userId: userId, form: form });
    },
  });

  console.log(values.roleTypes);
  return (
    <>
      <GoBack />
      <Header>Информация о сотруднике. Редактирование </Header>

      <FormWrapper>
        <FormItem label="Фамилия">
          <Input
            name="lastName"
            type="text"
            placeholder="Введите"
            value={values.lastName || undefined}
            onChange={(value) => setFieldValue('lastName', value.target.value)}
          />
          <ErrorMessage></ErrorMessage>
        </FormItem>
        <FormItem label="Имя">
          <Input
            name="firstName"
            type="text"
            placeholder="Введите"
            value={values.firstName || undefined}
            onChange={(value) => setFieldValue('firstName', value.target.value)}
          />
          <ErrorMessage></ErrorMessage>
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
            type="number"
            placeholder="Введите"
            value={values.cellphone || undefined}
            onChange={(value) => setFieldValue('cellphone', value.target.value)}
          />
          <ErrorMessage></ErrorMessage>
        </FormItem>

        <FormItem label="Роль в системе">
          <Select
            mode="multiple"
            placeholder="Выберите"
            onChange={(value) => setFieldValue('roleTypes', value)}
          >
            {multipleSelectionUserRoles?.map((elem) => (
              <Select.Option value={elem.value || ''} key={elem.value}>
                {elem.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <FormItem label="Компетенции">
          <Select
            mode="multiple"
            placeholder="Выберите"
            onChange={(value) => setFieldValue('firmCompetences', value)}
          >
            {multipleSelectionCompetences?.map((elem) => (
              <Select.Option value={elem.value} key={elem.value}>
                {elem.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <Footer>
          <Button
            type="default"
            onClick={() => handleSubmit()}
            disabled={isPending}
          >
            {isPending ? <Loader show /> : 'Сохранить'}
          </Button>
          <Button type="ghost" onClick={onCancel}>
            Отмена
          </Button>
        </Footer>
      </FormWrapper>
    </>
  );
};
