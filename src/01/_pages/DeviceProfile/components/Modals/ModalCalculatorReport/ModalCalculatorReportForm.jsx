import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import { InputTT, Title } from '../../../../../tt-components';

const ModalCalculatorReportForm = (device) => {

  console.log("ModalCalculatorReportForm", device)



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

  return (
    <>
      <Form id="formikForm" onSubmit={handleSubmit}>
        <Title size="middle" color="black">
          Выгрузка отчета о общедомовом потреблении</Title>
        <Form.Item label="Label ввода">
          <InputTT
            name="test"
            placeholder="Placeholder"
            onChange={handleChange}
            value={values.test}
          />
          <Alert name="test" />
        </Form.Item>
      </Form>
    </>
  );
};

export default ModalCalculatorReportForm;
