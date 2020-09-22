import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '01/components';
import axios from '01/axios';
import { useHistory } from 'react-router-dom';
import login from '01/assets/svg/login.svg';
import logo from '01/assets/svg/logo.svg';
import {
  Title, Label, Wrap, Button, Input, Icon,
} from '01/tt-components';
import styled from 'styled-components';
import { some } from 'lodash';
// import { useLogin } from './useLogin';

export const Main = styled.div`
  height: 100vh;
  padding: 40px;
  place-content: center;
  background: var(--login-bg);
  color: #fff;
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
  const [submit, setSubmit] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { replace } = useHistory();

  const someFunc = () => {
    console.log('someFunc');
  };

  useEffect(() => {
    if (submit) {
      (async function () {
        try {
          await axios.post('auth/login', { email, password });
          await axios.get('ManagingFirmUsers/current');
          replace('/tasks/');
        } catch (error) {
          setSubmit(false);
        } finally {
          setSubmit(false);
        }
      }());
    }
  }, [submit, email, password, replace]);

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
        <Title size="40">Вход в систему</Title>
        <Form
          // {...formProps}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmit(true);
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
                readOnly={submit}
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
                readOnly={submit}
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
          <Loader show={submit} size="48">
            <Button
              data-big
              data-primary
              //  {...btnFormProps}
              disabled={submit}
              type="submit"
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
