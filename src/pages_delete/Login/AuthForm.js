import React, { useState } from "react"
import styled, { css } from "reshadow/macro"

import { Input, Label, Button } from "components"
import { useAuth } from "./useAuth"

export const AuthForm = ({ styles }) => {
  const [inputs, setInputs] = useState({
    email: { value: "" },
    password: { value: "" },
  })
  const { submit, loading } = useAuth()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((inputs) => ({ ...inputs, [name]: { ...inputs[name], value } }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submit({ email: inputs.email.value, password: inputs.password.value })
  }

  return styled(styles)(
    <div>
      <h1>Вход в систему</h1>
      <form onSubmit={handleSubmit}>
        <Label labelText="Логин">
          <Input
            big
            name="email"
            value={inputs.email.value}
            onChange={handleChange}
            readOnly={loading}
          />
        </Label>
        <Label labelText="Пароль">
          <Input
            name="password"
            big
            password
            value={inputs.password.value}
            onChange={handleChange}
            readOnly={loading}
          />
        </Label>
        <Button
          big
          primary
          disabled={!inputs.password.value || !inputs.email.value}
          loading={loading}
        >
          Вход в систему
        </Button>
      </form>
    </div>
  )
}

AuthForm.defaultProps = {
  styles: css`
    form {
      min-width: 400px;
      margin: 0 auto;
      display: grid;
      grid-gap: 24px;
    }

    h1 {
      font-size: 40px;
      line-height: 48px;
      font-weight: 300;
      margin: 0 auto 32px;
    }
  `,
}
