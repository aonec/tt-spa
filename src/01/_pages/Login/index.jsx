import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from '01/axios';
import login from '01/assets/svg/login.svg';
import logo from '01/assets/svg/logo.svg';
import { Label, Input, Icon } from '01/tt-components';
import { Title } from '../../tt-components/Title';
import styled from 'styled-components';
import { message } from 'antd';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { DevSettingsModal } from '01/features/developmentSettings';
import { openDevSettingsModal } from '01/features/developmentSettings/models';
import { parse } from 'query-string';
import { Button } from 'ui-kit/Button';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { devUrl } from '01/axios';

export const Main = styled.div`
  height: 100vh;
  padding: 40px;
  place-content: center;
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

export const LoginTopHeader = styled.div`
  position: absolute;
  display: flex;
`;

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { replace } = useHistory();
  const { search } = useLocation();

  const cx = classNames.bind(styles);

  async function FormSubmitHadler() {
    setLoading(true);
    try {
      const preparedEmail = email.trim();

      const res = await axios.post('auth/login', {
        email: preparedEmail,
        password,
      });
      setLoading(false);

      const { redirectUrl } = parse(search);
      if (redirectUrl && redirectUrl !== '/login') {
        return window.location.replace(redirectUrl);
      }

      replace(res.roles.includes('Operator') ? '/meters' : '/tasks');
    } catch (error) {
      setLoading(false);

      message.error('Корректно введите логин и пароль');
    }
  }

  const isDev =
    process.env.NODE_ENV === 'development' ||
    process.env.REACT_APP_API_URL === devUrl;

  return (
    <Main>
      <LoginLeft>
        <LoginTopHeader>
          <Img src={logo} alt="logo" />
          <Title size="24">TT Management</Title>
        </LoginTopHeader>
        <Img src={login} alt="login" />
      </LoginLeft>
      <LoginRight>
        <Title size="big">Вход в систему</Title>
        <Form className="form" onSubmit={FormSubmitHadler}>
          <div>
            <Label>Логин</Label>
            <Input data-big>
              <input
                autoFocus
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
          </div>

          <div>
            <Label>Пароль</Label>
            <Input data-big>
              <input
                name="password"
                placeholder="Введите пароль"
                readOnly={loading}
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  if (e.nativeEvent.data === ' ') return;
                  setPassword(e.target.value);
                }}
              />
              <Icon
                icon={showPass ? 'off' : 'on'}
                onClick={() => {
                  setShowPass(!showPass);
                }}
              />
            </Input>
          </div>
          <Button isLoading={loading} onClick={FormSubmitHadler} floating>
            <span>Вход в систему</span>
          </Button>
        </Form>
        {isDev && (
          <>
            <DevSettingsModal />
            <Space />
            <Button
              onClick={openDevSettingsModal}
              size="small"
              type="ghost"
              className={cx('devSettings-btn')}
            >
              Development settings
            </Button>
          </>
        )}
      </LoginRight>
    </Main>
  );
};

export default Login;
