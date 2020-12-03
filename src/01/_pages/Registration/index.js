import React, { useState } from 'react';

import { Input, Form } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styles from './registration.module.scss';
import logo from '../../assets/svg/logo.svg';
import login from '../../assets/svg/login.svg';
import { ButtonTT, Title } from '../../tt-components';

export const Registration = () => {
  console.log('Registration');
  const [isHidden, setIsHidden] = useState(true);

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Введите пароль'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли не совпадают').required('Подтвердите пароль')
      // password: Yup.string().min(6, 'пароль должен быть не меньше 6 знаков').required('Нельзя оставлять пустым'),
      // confirmPassword: Yup.string().min(6, 'пароль должен быть не меньше 6 знаков').required('Нельзя оставлять пустым'),
    }),
    onSubmit: async () => {
      if (values.password == values.confirmPassword) {
        const form = {
          password: values.password,
          confirmPassword: values.confirmPassword,
        };
        alert('Пароь успешно сохранен!');
        console.log(JSON.stringify(form));
      } else {
        setIsHidden(false);
        alert('Пароли не совпадают');
      }

    },
  });

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return (
        <div style={{ color: 'white' }}>{error}</div>
      );
    }
    return null;
  };
  const handleClick = () => {
    console.log('handleClick');
    setIsHidden(true);
  };

  return (
    <div className={styles.registration}>
      <div className={styles.registration__left}>
        <div style={{ display: 'flex' }}>
          <img src={logo} alt="logo" />
          <Title size="24">TT Management</Title>
        </div>

        <img src={login} alt="login" style={{ width: '100%' }} />
      </div>
      <div className={styles.registration__right}>
        <form id="registration" style={{ maxWidth: 400 }} onSubmit={handleSubmit}>
          <Title size="40" color="white">Введите пароль для входа в систему</Title>

          <Form.Item label={<label style={{ color: '#ffffff' }}>Пароль</label>}>
            <Input.Password
              size="large"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
            />
            <Alert name="password" />
          </Form.Item>

          <Form.Item style={{ position: 'relative' }} label={<label style={{ color: '#ffffff' }}>Повторите пароль</label>}>
            <Input.Password
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirmPassword"
              size="large"
            />
            <div className={styles.hidden} hidden={isHidden}>
              <span>Пароли не совпадают </span>
              <a className={styles.close} onClick={handleClick}>X</a>
            </div>
            <Alert name="confirmPassword" />
          </Form.Item>

          <ButtonTT
            type="submit"
            color={isHidden ? 'blue' : 'blueshadow'}
            style={{ width: '100%' }}
          >
            Вход в систему
          </ButtonTT>
        </form>

      </div>
    </div>
  );
};

export default Registration;
