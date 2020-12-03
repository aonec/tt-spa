import React from 'react';

import styles from './registration.module.scss';
import logo from '../../assets/svg/logo.svg';
import { Title } from '../../tt-components/Title';
import login from '../../assets/svg/login.svg';
import {ButtonTT, Header } from "../../tt-components";

import { Button, Input, Form } from "antd";


export const Registration = () => {
  console.log('Registration');
  return (
    <div className={styles.registration}>
      <div className={styles.registration__left}>
        <img src={logo} alt="logo" />
        <Title size="24">TT Management</Title>
        <img src={login} alt="login" />
      </div>
      <div className={styles.registration__right} >
        <form id='registration'>
          <Form.Item label='Пароль'>
            <Input.Password placeholder="input password" />
          </Form.Item>

          <Form.Item label='Повторите пароль'>
            <Input.Password placeholder="input password" />
          </Form.Item>


          <ButtonTT color={'blue'}>Вход в систему</ButtonTT>
        </form>
        <Header color='white'>Введите пароль для входа в систему</Header>
      </div>
    </div>
  );
};

export default Registration;
