import React, { useEffect } from 'react';
import { Form } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonTT, InputTT, SelectTT } from '../../../tt-components';
import { timeZones } from '../../../tt-components/localBases';
import { putCurrentManagingFirm } from '../apiSettings';

const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

const Common = (props) => {
  const { firm, setFirm } = props;
  const {
    id, name, phoneNumber, timeZoneOffset,
  } = firm || {};

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      name,
      phoneNumber: phoneNumber || '',
      timeZoneOffset,
      currenTimeZoneNumber: _.find(timeZones, { item: timeZoneOffset }).value,
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string().matches(phoneRegExp, 'Укажите верно номер телефона'),
      name: Yup.string().required('Введите наименование компании'),
    }),
    onSubmit: async () => {
      const form = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        timeZoneOffset: values.timeZoneOffset,
      };

      console.log('form', form);
      putCurrentManagingFirm(id, form);
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

  const buttonHandler = () => {
    console.log('buttonHandler', values);
  };

  return (
    <div>
      <form style={{ maxWidth: '480px' }} onSubmit={handleSubmit}>
        <Form.Item label="Название компании">
          <InputTT
            placeholder="УК «Лесные озёра»"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
          />
          <Alert name="name" />
        </Form.Item>

        <Form.Item label="Телефон">
          <InputTT
            placeholder="89999999999"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            name="phoneNumber"
          />
          <Alert name="phoneNumber" />

        </Form.Item>
        <Form.Item label="Часовой пояс">
          <SelectTT
            options={timeZones}
            placeholder="Часовой пояс"
            value={values.currenTimeZoneNumber}
            name="timeZoneOffset"
            onChange={(value) => {
              const res = _.find(timeZones, { value }).item;
              setFieldValue('currenTimeZoneNumber', value);
              setFieldValue('timeZoneOffset', res);
            }}
          />
        </Form.Item>
        <ButtonTT
          onClick={handleSubmit}
          type="submit"
          color="blue"
        >
          Сохранить
        </ButtonTT>
      </form>

    </div>
  );
};

export default Common;
