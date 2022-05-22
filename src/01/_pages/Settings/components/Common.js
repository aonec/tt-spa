import React, { useContext, useEffect } from 'react';
import { Form } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonTT, InputTT, SelectTT } from '../../../tt-components';
import { timeZones, phoneRegExp } from '../../../tt-components/localBases';
import { putCurrentManagingFirm } from '../apiSettings';
import { SettingsContext } from '../index';

const Common = () => {
  const { firm } = useContext(SettingsContext);
  const { id, name, phoneNumber, timeZoneOffset } = firm || {};

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
      name,
      phoneNumber: phoneNumber || '',
      timeZoneOffset,
      currenTimeZoneNumber: _.find(timeZones, { item: timeZoneOffset }).value,
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string().matches(
        phoneRegExp,
        'Укажите верно номер телефона'
      ),
      name: Yup.string().required('Введите наименование компании'),
    }),
    onSubmit: async () => {
      const form = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        timeZoneOffset: values.timeZoneOffset,
      };

      putCurrentManagingFirm(id, form);
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

  const buttonHandler = () => {
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
        <ButtonTT onClick={handleSubmit} type="submit" color="blue">
          Сохранить
        </ButtonTT>
      </form>
    </div>
  );
};

export default Common;
