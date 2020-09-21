import React from 'react';

import { input, button } from '01/r_comp';
import { Icon, Loader } from '01/components';
import styled from 'styled-components';
import { useLogin } from './useLogin';

export const Template = styled.div``;

export const Form = styled.form`
  display: grid;
  min-width: 400px;
  grid-gap: 24px;
`;

export const Main = styled.form`
  display: grid;
  height: 100vh;
  place-content: center;
  background: var(--login-bg);
  color: #fff;
`;

export const Label = styled.form`
  display: grid;
  grid-gap: 8px;
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
      <Form {...formProps}>
        <Label>
          Логин
          <input_frame data-big>
            <input {...emailProps} />
          </input_frame>
        </Label>
        <Label>
          Пароль
          <input_frame data-big style={{ background: 'white' }}>
            <input {...passProps} />
            <pass_btn as="Icon" {...passBtnProps} />
          </input_frame>
        </Label>
        <Loader show={submit} size="48">
          <button data-big data-primary {...btnFormProps}>
            <span>Вход в систему</span>
          </button>
        </Loader>
      </Form>
    </Main>
  );
};

export default Login;

// import React from "react";
// import styled, { css } from "reshadow/macro";

// import { useLogin } from "./useLogin";
// import { input, button } from "01/r_comp";
// import { Icon, Loader } from "01/components";

// const styles = css`
//   form,
//   main,
//   label {
//     display: grid;
//   }

//   main {
//     height: 100vh;
//     place-content: center;
//     background: var(--login-bg);
//     color: #fff;
//   }

//   form {
//     min-width: 400px;
//     grid-gap: 24px;
//   }

//   label {
//     grid-gap: 8px;
//   }
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
//   return styled(input, button, styles)(
//     <main>
//       <form {...formProps}>
//         <label>
//           Логин
//           <input_frame data-big>
//             <input {...emailProps} />
//           </input_frame>
//         </label>
//         <label>
//           Пароль
//           <input_frame data-big>
//             <input {...passProps} />
//             <pass_btn as="Icon" {...passBtnProps} />
//           </input_frame>
//         </label>
//         <Loader show={submit} size="48">
//           <button data-big data-primary {...btnFormProps}>
//             <span>Вход в систему</span>
//           </button>
//         </Loader>
//       </form>
//     </main>
//   );
// };
