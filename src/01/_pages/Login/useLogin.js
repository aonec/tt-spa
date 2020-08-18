import React from "react"
import axios from "01/axios"
import { useHistory } from "react-router-dom"

export const useLogin = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [submit, setSubmit] = React.useState(false)
  const [showPass, setShowPass] = React.useState(false)
  const { replace } = useHistory()

  React.useEffect(() => {
    if (submit) {
      ;(async function() {
        try {
          await axios.post("auth/login", { email, password })
          await axios.get("ManagingFirmUsers/current")
          replace("/tasks/")
        } catch (error) {
          setSubmit(false)
        }
      })()
    }
  }, [submit, email, password, replace])

  return {
    submit,
    formProps: {
      onSubmit(e) {
        e.preventDefault()
        setSubmit(true)
      },
    },
    emailProps: {
      name: "email",
      placeholder: "Введите логин",
      type: "text",
      readOnly: submit,
      value: email,
      onChange(e) {
        setEmail(e.target.value)
      },
    },
    passProps: {
      name: "password",
      placeholder: "Введите пароль",
      readOnly: submit,
      type: showPass ? "text" : "password",
      value: password,
      onChange(e) {
        setPassword(e.target.value)
      },
    },
    btnFormProps: {
      disabled: submit,
      type: "submit",
    },
    passBtnProps: {
      icon: showPass ? "off" : "on",
      onClick() {
        setShowPass(!showPass)
      },
    },
  }
}
