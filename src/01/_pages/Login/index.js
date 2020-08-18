import React from "react"
import styled, { css } from "reshadow/macro"

import { useLogin } from "./useLogin"
import { input, button } from "01/r_comp"
// eslint-disable-next-line
import { Icon, Loader } from "01/components"

const styles = css`
  form,
  main,
  label {
    display: grid;
  }

  main {
    height: 100vh;
    place-content: center;
    background: var(--login-bg);
    color: #fff;
  }

  form {
    min-width: 400px;
    grid-gap: 24px;
  }

  label {
    grid-gap: 8px;
  }
`

export const Login = () => {
  const {
    submit,
    formProps,
    emailProps,
    passProps,
    btnFormProps,
    passBtnProps,
  } = useLogin()
  return styled(input, button, styles)(
    <main>
      <form {...formProps}>
        <label>
          Логин
          <input_frame data-big>
            <input {...emailProps} />
          </input_frame>
        </label>
        <label>
          Пароль
          <input_frame data-big>
            <input {...passProps} />
            <pass_btn as="Icon" {...passBtnProps} />
          </input_frame>
        </label>
        <Loader show={submit} size="48">
          <button data-big data-primary {...btnFormProps}>
            <span>Вход в систему</span>
          </button>
        </Loader>
      </form>
    </main>
  )
}
