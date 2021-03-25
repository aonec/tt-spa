import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form, Modal } from 'antd';
import { ButtonTT, InputTT, Title } from '../../tt-components';

const ModalTemplateForm = () => {
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
      return <div>{error}</div>;
    }
    return null;
  };

  return (
    <>
      <form id="formikForm" onSubmit={handleSubmit}>
        <Title size="middle" color="black">
          Тестовое модальное окно
        </Title>
        <Form.Item label="Label ввода">
          <InputTT
            name="test"
            placeholder="Placeholder"
            onChange={handleChange}
            value={values.test}
          />
          <Alert name="test" />
        </Form.Item>
        <StyledFooter>
          <ButtonTT type="submit" color="blue">
            ОК
          </ButtonTT>
          <ButtonTT
            style={{ marginLeft: '16px' }}
            color="white"
            onClick={handleCancel}
          >
            Отмена
          </ButtonTT>
        </StyledFooter>
      </form>
    </>
  );
};

export default ModalTemplateForm;
