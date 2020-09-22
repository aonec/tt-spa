import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Loader } from '01/components';
import axios from '01/axios';
import login from '01/assets/svg/login.svg';
import logo from '01/assets/svg/logo.svg';

import {
  Title, Label, Wrap, Button, Input, Icon,
} from '01/tt-components';

import styled from 'styled-components';
// import { useLogin } from './useLogin';

export const Main = styled.div`
  height: 100vh;
  padding: 40px;
  place-content: center;
  /* background: var(--login-bg); */
  background: #12193d;
  color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;
export const Form = styled.form`
  display: grid;
  max-width: 400px;
  height: fit-content;
  grid-gap: 24px;
`;

export const Img = styled.img`
  margin-right: 16px;
`;

export const LoginLeft = styled.div`
  position: relative;
  display: flex;
  justify-self: end;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
`;

export const LoginRight = styled.div`
  margin-left: 48px;
`;

export const LoginTop = styled.div`
  position: absolute;
  display: flex;
`;

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { replace } = useHistory();

  const someFunc = () => {
    console.log('someFunc');
  };

  const okButtonHadler = () => {
    (async function () {
      setLoading(true);
      try {
        await axios.post('auth/login', { email, password });
        await axios.get('ManagingFirmUsers/current');
        replace('/tasks/');
      } catch (error) {
        alert('Корректно введите логин и пароль');
      } finally {
        setLoading(false);
      }
    }());
  };

  return (
    <Main>
      <LoginLeft>
        <LoginTop>
          <Img src={logo} alt="logo" />
          <Title size="24">TT Management</Title>
        </LoginTop>
        <Img src={login} alt="login" />
      </LoginLeft>
      <LoginRight>
        <Title size="big">Вход в систему</Title>
        <Form
          // {...formProps}
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
          }}
        >
          <Wrap>
            <Label>Логин</Label>
            <Input data-big>
              <input
                // {...emailProps}
                name="email"
                placeholder="Введите логин"
                type="text"
                readOnly={loading}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Input>
          </Wrap>

          <Wrap>
            <Label>Пароль</Label>
            <Input data-big>
              <input
                //  {...passProps}
                name="password"
                placeholder="Введите пароль"
                readOnly={loading}
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Icon
                //  {...passBtnProps}
                icon={showPass ? 'off' : 'on'}
                // onClick={setShowPass(!showPass)}
                onClick={() => {
                  setShowPass(!showPass);
                }}
              />
            </Input>
          </Wrap>
          <Loader show={loading} size="48">
            <Button
              data-big
              data-primary
              //  {...btnFormProps}
              disabled={loading}
              type="loading"
              onClick={okButtonHadler}
            >
              <span>Вход в систему</span>
            </Button>
          </Loader>
        </Form>
      </LoginRight>
    </Main>
  );
};

export default Login;
