import React from 'react';
import { Input, Form } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import queryString from 'query-string';
import logo from '../../assets/svg/logo.svg';
import login from '../../assets/svg/login.svg';
import { Button, Title } from '../../tt-components';
import { confirmRegistration } from './apiRegistration';
import styles from './registration.module.scss';
import { AccessDeniedPage } from '../AccessDeniedPage';

export const Registration = () => {
  const parsedSearch = queryString.parse(window.location.search);
  // console.log(parsedSearch);
  const { token } = parsedSearch;
  // console.log(token);

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
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли не совпадают').required('Подтвердите пароль'),
    }),
    onSubmit: async () => {
      console.log('accessToken', token);
      const form = {
        token,
        password: values.password,
      };
      confirmRegistration(form);
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

  if (!token) {
    return (
      <AccessDeniedPage />
    );
  }

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

          <Form.Item label={<label>Пароль</label>}>
            <Input.Password
              size="large"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
            />
            <Alert name="password" />
          </Form.Item>

          <Form.Item label={<label>Повторите Пароль</label>}>
            <Input.Password
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirmPassword"
              size="large"
            />
            <Alert name="confirmPassword" />
          </Form.Item>

          <Button
            data-big
            data-primary
            type="submit"
            style={{ width: '100%', marginTop: '24px' }}
          >
            <span>Вход в систему</span>
          </Button>
        </form>

      </div>
    </div>
  );
};

export default Registration;

{ /* <ButtonTT */
}
{ /*  type="submit" */
}
{ /*  color="blue" */
}
{ /*  style={{ width: '100%' }} */
}
{ /* > */
}
{ /*  Вход в систему */
}
{ /* </ButtonTT> */
}
