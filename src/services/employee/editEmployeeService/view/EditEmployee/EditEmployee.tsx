import React, { FC } from 'react';
import { Footer, Header, Wrapper } from './EditEmployee.styled';
import { EditEmployeeProps } from './EditEmployee.types';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { MultiSelectTT } from '01/tt-components';
import { useFormik } from 'formik';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Button } from 'ui-kit/Button';
import { useHistory, useParams } from 'react-router-dom';
import { Loader } from '01/_components/Loader';

export const EditEmployee: FC<EditEmployeeProps> = ({
  onSubmit,
  isPending,
  multipleSelectionCompetences,
  multipleSelectionUserRoles,
}) => {
  const params = useParams<{ id: string }>();
  const userId = Number(params.id);

  const history = useHistory();
  const onCancel = () => history.push('/companyProfile/staff');

  const { handleSubmit, errors, setFieldValue, values } = useFormik({
    initialValues: {
      email: null,
      firstName: null,
      lastName: null,
      middleName: null,
      cellphone: null,
      roleTypes: null,
      firmCompetenceIds: null,
    },
    validationSchema: {},
    onSubmit: () => {},
  });
  return (
    <>
      <GoBack />
      <Header>Информация о сотруднике. Редактирование </Header>

      <FormItem label="Фамилия">
        <Input
          name="lastName"
          type="text"
          value={values.lastName || undefined}
          onChange={(value) => setFieldValue('lastName', value.target.value)}
        />
        <ErrorMessage></ErrorMessage>
      </FormItem>
      <FormItem label="Имя">
        <Input
          name="firstName"
          type="text"
          value={values.firstName || undefined}
          onChange={(value) => setFieldValue('firstName', value.target.value)}
        />
        <ErrorMessage></ErrorMessage>
      </FormItem>
      <FormItem label="Отчество">
        <Input
          name="middleName"
          type="text"
          value={values.middleName || undefined}
          onChange={(value) => setFieldValue('middleName', value.target.value)}
        />
      </FormItem>
      <FormItem label="Электронная почта">
        <Input
          name="email"
          type="text"
          value={values.email || undefined}
          onChange={(value) => setFieldValue('email', value.target.value)}
        />
        <ErrorMessage></ErrorMessage>
      </FormItem>
      <FormItem label="Контактный телефон">
        <Input
          name="cellphone"
          type="number"
          value={values.cellphone || undefined}
          onChange={(value) => setFieldValue('cellphone', value.target.value)}
        />
        <ErrorMessage></ErrorMessage>
      </FormItem>
      <FormItem label="Роль в системе">
        <MultiSelectTT
          mode="multiple"
          value={values.roleTypes || undefined}
          options={multipleSelectionUserRoles}
          onChange={(value) => setFieldValue('roleTypes', value)}
        />
        <ErrorMessage></ErrorMessage>
      </FormItem>
      <FormItem label="Компетенции">
        <MultiSelectTT
          mode="multiple"
          value={values.firmCompetenceIds || undefined}
          options={multipleSelectionCompetences}
          onChange={(value) => setFieldValue('firmCompetenceIds', value)}
        />
      </FormItem>

      <Footer>
        <Button
          color="blue"
          onClick={() => handleSubmit()}
          disabled={isPending}
        >
          {isPending ? <Loader show /> : 'Сохранить'}
        </Button>
        <Button
          color="white"
          style={{ marginRight: '15px' }}
          onClick={onCancel}
        >
          Отмена
        </Button>
      </Footer>
    </>
  );
};
