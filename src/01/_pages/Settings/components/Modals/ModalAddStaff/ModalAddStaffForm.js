import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import {
  ButtonTT, SelectTT, InputTT, Title,
} from '../../../../../tt-components';
import { UserRoles } from '../../../../../tt-components/localBases';
import { SettingsContext } from '../../../index';
import { postStaff } from '../../../apiSettings';

const ModalAddStaffForm = () => {
  const { staff, setStaff, hideStaff } = useContext(SettingsContext);

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      userRolesIds: 1334534,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Строка не должна быть пустой'),
      lastName: Yup.string().required('Строка не должна быть пустой'),
      middleName: Yup.string().required('Строка не должна быть пустой'),
      email: Yup.string().email('Укажите адрес в формате name@mail.ru').required('Строка не должна быть пустой'),
    }),
    onSubmit: async () => {
      console.log('1334534');
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
        userRolesIds: [values.userRolesIds],
      };

      console.log(form)
       console.log(JSON.stringify(form));
      // postStaff(form);
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

  const handleButton = () => {
    console.log('errors', errors);
  };

  return (
    <>
      <form id="modalAddStaffForm" onSubmit={handleSubmit}>
        <Title size="middle" color="black">
          Добавление нового сотрудника
        </Title>
        <Form.Item label="Имя">
          <InputTT
            name="firstName"
            placeholder="Имя"
            onChange={handleChange}
            value={values.firstName}
          />
          <Alert name="firstName" />
        </Form.Item>

        <Form.Item label="Фамилия">
          <InputTT
            name="lastName"
            placeholder="Фамилия"
            onChange={handleChange}
            value={values.lastName}
          />
          <Alert name="lastName" />
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
              setFieldValue('userRolesIds', value);
            }}
            options={UserRoles}
            value={values.userRolesIds}
          />
          <Alert name="role" />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '32px 0 0 0' }}>
          {/*<ButtonTT color="white" onClick={handleButton} style={{ marginRight: 16 }}>handleButton</ButtonTT>*/}
          <ButtonTT
            color="white"
            onClick={hideStaff}
            style={{ marginRight: 16 }}
          >
            Отмена
          </ButtonTT>

          <ButtonTT
            color="blue"
            type="submit"
            onClick={handleSubmit}
            form="modalAddStaffForm"
            style={{ width: 224 }}
            disabled
          >
            Добавить
          </ButtonTT>
        </div>

      </form>
    </>
  );
};

export default ModalAddStaffForm;
