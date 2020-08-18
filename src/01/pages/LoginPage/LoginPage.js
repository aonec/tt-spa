import React from "react"
import styled, { use } from "reshadow/macro"
import { Route } from "react-router-dom"

import { input, button } from "01/r_comp"
import { useLoginPage } from "./useLoginPage"

const SubmitButton = (props) =>
  styled(button)(
    <button data-primary data-big type="submit" {...props}>
      <span>Вход в систему</span>
    </button>
  )

export const LoginPage = () => {
  const { form, email, password, valid } = useLoginPage()

  return styled(input)(
    <auth_page>
      <title_page as="h1">Вход в систему</title_page>
      <login_form as="form" {...form}>
        <label>
          Логин
          <input_frame data-big {...use({ ...valid.email })}>
            <input {...email} />
          </input_frame>
        </label>
        <label>
          Пороль
          <input_frame data-big {...use({ ...valid.password })}>
            <input {...password} />
          </input_frame>
        </label>
        <SubmitButton />
      </login_form>

      <Route path="/auth/logout" render={() => "logout"} />
    </auth_page>
  )
}
