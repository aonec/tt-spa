import React from 'react';
import { Loader } from '01/components';
import login from '01/assets/svg/login.svg';
import logo from '01/assets/svg/logo.svg';
import {
  Title, Label, Wrap, Button, Input, Icon,
} from '01/tt-components';
import styledcomponent from 'styled-components';
import { useLogin } from './useLogin';

export const Main = styledcomponent.div`
  height: 100vh;
    place-content: center;
    background: var(--login-bg);
    color: #fff;
     display: grid;
     display: grid;
     grid-template-columns: 1fr 1fr;
     align-items: center;
`;
export const Form = styledcomponent.form`
display: grid;
    width: 400px;
    height: fit-content;
    grid-gap: 24px;
`;

export const Img = styledcomponent.img`
margin-right: 16px;
`;

export const LoginLeft = styledcomponent.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
margin-left: auto;
padding-top: 48px;
`;

export const LoginRight = styledcomponent.div`
margin-left: 48px;
`;

export const LoginTop = styledcomponent.div`
position: absolute;
display: flex;
`;

export const Login = () => {
  const {
    submit,
    formProps,
    emailProps,
    passProps,
    btnFormProps,
    passBtnProps,
  } = useLogin();

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
        <Form {...formProps}>
          <Wrap>
            <Label>Логин</Label>
            <Input data-big>
              <input {...emailProps} />
            </Input>
          </Wrap>

          <Wrap>
            <Label>Пароль</Label>
            <Input data-big>
              <input {...passProps} />
              <Icon {...passBtnProps} />
            </Input>
          </Wrap>
          <Loader show={submit} size="48">
            <Button data-big data-primary {...btnFormProps}>
              <span>Вход в систему</span>
            </Button>
          </Loader>
        </Form>
      </LoginRight>
    </Main>
  );
};

export default Login;
// import React from 'react';

// import { input, button } from '01/r_comp';
// import { Icon, Loader } from '01/components';
// import styled from 'styled-components';
// import { useLogin } from './useLogin';

// export const Template = styled.div``;

// export const Form = styled.form`
//   display: grid;
//   min-width: 400px;
//   grid-gap: 24px;
// `;

// export const Main = styled.form`
//   display: grid;
//   height: 100vh;
//   place-content: center;
//   background: var(--login-bg);
//   color: #fff;
// `;

// export const Index = styled.form`
//   display: grid;
//   grid-gap: 8px;
// `;

// export const Input = styled.input`
//   background: #ffffff;
//   border: 1px solid #dcdee4;
//   box-sizing: border-box;
//   border-radius: 4px;
//   height: 48px;
//   color: var(--main-80);
// `;

// export const Index = styled.h2`
//   padding: 0;
//   margin: 0;
//   font-weight: 300;
//   font-size: 40px;
//   line-height: 48px;
//   color: #ffffff;
// `;

// export const Login = () => {
//   const {
//     submit,
//     formProps,
//     emailProps,
//     passProps,
//     btnFormProps,
//     passBtnProps,
//   } = useLogin();

//   return (
//     <Main>
//       <Form {...formProps}>
//         <Index>Вход в систему</Index>
//         <Index>
//           Логин
//           <Input />
//           {/* <input_frame data-big>
//             <Input {...emailProps} />
//           </input_frame> */}
//         </Index>
//         <Index>
//           Пароль
//           <Input />
//           {/* <input_frame data-big>
//             <Input {...passProps} />
//             <pass_btn as="Icon" {...passBtnProps} />
//           </input_frame> */}
//         </Index>
//         <Loader show={submit} size="48">
//           <button data-big data-primary {...btnFormProps}>
//             <span>Вход в систему</span>
//           </button>
//         </Loader>
//       </Form>
//     </Main>
//   );
// };

// export default Login;
