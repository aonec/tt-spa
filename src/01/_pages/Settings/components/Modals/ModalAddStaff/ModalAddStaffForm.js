import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import {
  ButtonTT,
  SelectTT,
  InputTT,
  Title,
  StyledModalBody,
  StyledFooter,
  StyledModal,
} from '../../../../../tt-components';
import { UserRoles } from '../../../../../tt-components/localBases';
import { SettingsContext } from '../../../index';
import { postStaff } from '../../../apiSettings';

const ModalAddStaffForm = () => {
  const { staff, setStaff, hideStaff } = useContext(SettingsContext);

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
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
      email: '',
      userRolesIds: 760,
      number: '123',
      position: 'Новый сотрудник',
      cellphone: '+79372959484',
      department: 'TT',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Строка не должна быть пустой'),
      lastName: Yup.string().required('Строка не должна быть пустой'),
      middleName: Yup.string().required('Строка не должна быть пустой'),
      email: Yup.string()
        .email('Укажите адрес в формате name@mail.ru')
        .required('Строка не должна быть пустой'),
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
        userRolesIds: [values.userRolesIds],
        number: values.number,
        position: values.position,
        cellphone: values.cellphone,
        department: values.department,
      };

      postStaff(form);
    },
  });
  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  // const handleButton = () => {
  // };

  return (
    <form id="modalAddStaffForm" onSubmit={handleSubmit}>
      <Title size="middle" color="black" style={{ padding: '12px 32px' }}>
        Добавление нового сотрудника
      </Title>
      <StyledModalBody style={{ overflowY: 'scroll', maxHeight: '600px' }}>
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

        <Form.Item label="Телефон">
          <InputTT
            name="cellphone"
            placeholder="Телефон"
            onChange={handleChange}
            value={values.cellphone}
          />
          <Alert name="cellphone" />
        </Form.Item>

        <Form.Item label="Департамент">
          <InputTT
            name="department"
            placeholder="Департамент"
            onChange={handleChange}
            value={values.department}
          />
          <Alert name="department" />
        </Form.Item>

        <Form.Item label="Должность">
          <InputTT
            name="position"
            placeholder="Должность"
            onChange={handleChange}
            value={values.position}
          />
          <Alert name="position" />
        </Form.Item>

        <Form.Item label="Табельный номер">
          <InputTT
            name="number"
            placeholder="Табельный номер"
            onChange={handleChange}
            value={values.number}
          />
          <Alert name="number" />
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
      </StyledModalBody>

      <StyledFooter>
        <ButtonTT color="white" onClick={hideStaff} style={{ marginRight: 16 }}>
          Отмена
        </ButtonTT>

        <ButtonTT color="blue" type="submit" big>
          Добавить
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default ModalAddStaffForm;
