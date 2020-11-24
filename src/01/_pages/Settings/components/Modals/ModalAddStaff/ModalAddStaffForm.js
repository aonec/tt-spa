import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import {
  ButtonTT, SelectTT, InputTT, Title,
} from '../../../../../tt-components';
import {UserRoles} from '../../../../../tt-components/localBases'
import { SettingsContext } from "../../../index";

const ModalAddStaffForm = () => {

  const {staff, setStaff, hideStaff} = useContext(SettingsContext);

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      role: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Строка не должна быть пустой'),
      lastName: Yup.string().required('Строка не должна быть пустой'),
      middleName: Yup.string().required('Строка не должна быть пустой'),
      email: Yup.string().required('Строка не должна быть пустой'),
    }),
    onSubmit: async () => {
      const template = {
        email: 'string',
        firstName: 'string',
        lastName: 'string',
        middleName: 'string',
        cellphone: 'string',
        department: 'string',
        position: 'string',
        number: 'string',
        password: 'string',
        userRolesIds: [0],
      };

      const form = {
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        email: values.email,
        position: 'string',
        number: 'string',
        userRolesIds: [0],
      };
      console.log(JSON.stringify(form));
      alert('Посмотрите результат в консоли');
    },
  });
  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return (
        <div>{error}</div>
      );
    }
    return null;
  };
  const options = [
    { value: 1, label: 'Паук1' },
    { value: 2, label: 'Паук2' },
    { value: 3, label: 'Паук3' },

  ];
  return (
    <>
      <form id="modalAddStaffForm" onSubmit={handleSubmit}>
        <Title size="middle" color="black">
          Добавление нового сотрудника
        </Title>
        <Form.Item label="Имя">
          <InputTT
            name="name"
            placeholder="Имя"
            onChange={handleChange}
            value={values.name}
          />
          <Alert name="name" />
        </Form.Item>

        <Form.Item label="Фамилия">
          <InputTT
            name="surname"
            placeholder="Фамилия"
            onChange={handleChange}
            value={values.surname}
          />
          <Alert name="surname" />
        </Form.Item>

        <Form.Item label="Отчество">
          <InputTT
            name="middlename"
            placeholder="Отчество"
            onChange={handleChange}
            value={values.middlename}
          />
          <Alert name="middlename" />
        </Form.Item>

        <Form.Item label="Электронная почта">
          <InputTT
            name="email"
            placeholder="Электронная почта"
            onChange={handleChange}
            value={values.email}
          />
          <Alert name="email" />
        </Form.Item>

        <Form.Item label="Роль в системе">
          <SelectTT
            name="role"
            placeholder="Роль в системе"
            onChange={(value) => {
              setFieldValue('role', value);
            }}
            options={UserRoles}
            value={values.role}
          />
          <Alert name="role" />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '32px 0 0 0' }}>
          <ButtonTT color="white" onClick={hideStaff} style={{marginRight: 16}}>Отмена</ButtonTT>
          <ButtonTT color="blue" type="submit" onClick={handleSubmit} style={{width: 224}}>Добавить</ButtonTT>
        </div>

      </form>
    </>
  );
};

export default ModalAddStaffForm;
