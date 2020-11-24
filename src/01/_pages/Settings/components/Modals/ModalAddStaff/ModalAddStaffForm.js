import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import SelectTT, { InputTT, Title } from '../../../../../tt-components';

const ModalAddStaffForm = () => {
  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      test: 'test',
    },
    validationSchema: Yup.object({
      test: Yup.string().required('Строка не должна быть пустой'),
    }),
    onSubmit: async () => {
      const form = {
        input1: values.test,
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
  const options = {
    value:
  }
  return (
    <>
      <form id="modalAddStaffForm" onSubmit={handleSubmit}>
        <Title size="middle" color="black">
          Тестовое модальное окно
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
            value={values.name}
          />
          <Alert name="name" />
        </Form.Item>

        <Form.Item label="Отчество">
          <InputTT
            name="middlename"
            placeholder="Отчество"
            onChange={handleChange}
            value={values.name}
          />
          <Alert name="name" />
        </Form.Item>

        <Form.Item label="Электронная почта">
          <InputTT
            type={'email'}
            name="middlename"
            placeholder="Электронная почта"
            onChange={handleChange}
            value={values.name}
          />
          <Alert name="email" />
        </Form.Item>

        <Form.Item label="Роль в системе">
          <SelectTT
            name="role"
            placeholder="Роль в системе"
            onChange={(value)=>{
              setFieldValue('role', value)}
            }
            options={}
            value={values.role}
          />
          <Alert name="role" />
        </Form.Item>


      </form>
    </>
  );
};

export default ModalAddStaffForm;
