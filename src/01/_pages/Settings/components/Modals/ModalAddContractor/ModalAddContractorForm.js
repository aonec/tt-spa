import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import {
  ButtonTT, SelectTT, InputTT, Title,
} from '../../../../../tt-components';
import {UserRoles} from '../../../../../tt-components/localBases'

const ModalAddContractorForm = () => {
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
          Добавление нового подрядчика
        </Title>
        <Form.Item label="Имя">
          <InputTT
            name="name"
            placeholder="Инженерный центр"
            onChange={handleChange}
            value={values.name}
          />
          <Alert name="name" />
        </Form.Item>


        <Form.Item label="Электронная почта">
          <InputTT
            name="email"
            placeholder="qwerty@yandex.ru"
            onChange={handleChange}
            value={values.email}
          />
          <Alert name="email" />
        </Form.Item>

        <Form.Item label="Контактный телефон">
          <InputTT
            name="email"
            placeholder="8 999 999 99-99"
            onChange={handleChange}
            value={values.email}
          />
          <Alert name="email" />
        </Form.Item>



        <div>
          <ButtonTT color="white">Отмена</ButtonTT>
          <ButtonTT color="blue" type="submit" onClick={handleSubmit}>Добавить</ButtonTT>

        </div>

      </form>
    </>
  );
};

export default ModalAddContractorForm;
