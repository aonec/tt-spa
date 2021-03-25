import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import { Header, InputTT, ButtonTT, SelectTT } from '../../../../tt-components';

import { UserRoles } from '../../../../tt-components/localBases';
import { putManagingFirmUsersCurrent } from '../../apiUserProfile';
import { Link } from 'react-router-dom';

const ManagingFirmStaff = (props) => {
  const { user } = props;
  const {
    id,
    email,
    firstName,
    lastName,
    middleName,
    cellphone,
    department,
    position,
    number,
    managementFirm,
    userRoleIds,
  } = user;

  const currentUserRoleIds = _.find(UserRoles, { value: userRoleIds[0] }).value;

  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log('currentUser', currentUser);

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email,
      firstName,
      lastName,
      middleName,
      cellphone,
      department,
      position,
      number,
      managementFirm,
      userRoleIds: currentUserRoleIds,
    },
    validationSchema: Yup.object({
      // test: Yup.number().typeError('Выберите узел').min(0, 'Скорее всего, выбран некорректный номер узла')
      //   .max(10, 'Скорее всего, выбран некорректный номер узла'),
    }),
    onSubmit: async () => {
      const form = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        cellphone: values.cellphone,
        department: values.department,
        position: values.position,
        number: values.number,
        userRolesIds: [values.userRolesIds || currentUserRoleIds],
      };

      putManagingFirmUsersCurrent(id, form);
      console.log('DONE', form);
      console.log('JSON', JSON.stringify(form));
    },
  });

  const putTemplate = {
    email: 'string',
    firstName: 'string',
    lastName: 'string',
    middleName: 'string',
    cellphone: 'string',
    department: 'string',
    position: 'string',
    number: 'string',
    userRolesIds: [0],
  };

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  const isTrue = (array, id) => array.find((item) => item === id);

  // const isAdministrator = currentUser.userRoleIds.find((item) => item === 1334533);

  const isAdministrator = isTrue(currentUser.userRoleIds, 1334533);

  console.log('isAdministrator', isAdministrator);

  const disabled = isAdministrator === undefined ? true : false;

  console.log('disabled', disabled);

  return (
    <div>
      <Header>{lastName}. Редактирование</Header>
      <Form id="formEditStaff" onSubmit={handleSubmit} style={{ width: 480 }}>
        <Form.Item label="Фамилия">
          <InputTT
            name="lastName"
            placeholder="Фамилия"
            onChange={handleChange}
            value={values.lastName}
          />
          <Alert name="lastName" />
        </Form.Item>

        <Form.Item label="Имя">
          <InputTT
            name="firstName"
            placeholder="Имя"
            onChange={handleChange}
            value={values.firstName}
          />
          <Alert name="firstName" />
        </Form.Item>

        <Form.Item label="Отчество">
          <InputTT
            name="middleName"
            placeholder="Отчество"
            onChange={handleChange}
            value={values.middleName}
          />
          <Alert name="middleName" />
        </Form.Item>

        <Form.Item label="Отдел">
          <InputTT
            name="department"
            placeholder="Инженерный"
            onChange={handleChange}
            value={values.department}
          />
          <Alert name="department" />
        </Form.Item>

        <Form.Item label="Должность">
          <InputTT
            name="position"
            placeholder="Паук УК"
            onChange={handleChange}
            value={values.position}
          />
          <Alert name="position" />
        </Form.Item>

        <Form.Item label="Внутренний номер">
          <InputTT
            name="number"
            placeholder="1234567890"
            onChange={handleChange}
            value={values.number}
          />
          <Alert name="number" />
        </Form.Item>

        <Form.Item label="Адрес электронной почты">
          <InputTT
            name="email"
            placeholder="qwerty@yandex.ru"
            onChange={handleChange}
            value={values.email}
          />
          <Alert name="email" />
        </Form.Item>

        <Form.Item label="Контактный номер">
          <InputTT
            name="cellphone"
            placeholder="8902444555666"
            onChange={handleChange}
            value={values.cellphone}
          />
          <Alert name="cellphone" />
        </Form.Item>

        <Form.Item label="Роль в системе">
          <SelectTT
            name="userRolesIds"
            placeholder="Паук"
            onChange={(value) => {
              setFieldValue('userRolesIds', value);
            }}
            // defaultValue={1334533}
            options={UserRoles}
            value={values.userRoleIds}
            readOnly
          />
          <Alert name="userRolesIds" />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <ButtonTT
            color="blue"
            type="submit"
            form="formReport"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Сохранить
          </ButtonTT>
          <Link to={'/settings/staff'}>
            <ButtonTT
              color="white"
              style={{ marginLeft: '16px' }}
              disabled={disabled}
              // onClick={handleCancel}
            >
              Отмена
            </ButtonTT>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default ManagingFirmStaff;
