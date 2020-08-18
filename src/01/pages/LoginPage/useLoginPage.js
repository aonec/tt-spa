import React from "react"
import { useHistory } from "react-router-dom"

import { useAppContext } from "01/hooks"

const initialState = {
  data: null,
  loading: false,
  error: null,
  valid: {},
}

export const useLoginPage = () => {
  const [data, setData] = React.useReducer({ email: "", password: "" })
  const { auth } = useAppContext()
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      const { type, payload } = action
      switch (type) {
        case "success":
          return initialState
        case "submit":
          return {
            ...state,
            data: { email: state.email, password: state.password },
            loading: true,
          }
        case "change":
          return { ...state, ...payload.input, valid: { ...payload.valid } }
        case "empty_error":
          return {
            ...state,
            valid: { ...state.valid, [payload.name]: { invalid: true } },
          }
        default:
          console.error("login", type)
          return state
      }
    },
    { ...initialState }
  )

  const onInvalid = (e) => {
    e.preventDefault()
    const empty = e.target.validity.valueMissing
    const name = e.target.name
    console.log(e.target.validity)
    if (empty) {
      dispatch({ type: "empty_error", payload: { name } })
    }
  }

  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const patternMatch = e.target.validity.patternMismatch
    const empty = e.target.validity.valueMissing
    dispatch({
      type: "change",
      payload: {
        input: {
          [name]: value,
        },
        valid: {
          [name]: {
            invalid: patternMatch,
            valid: !patternMatch && !empty,
          },
        },
      },
    })
  }

  return {
    valid: state.valid,
    form: {
      onSubmit(e) {
        e.preventDefault()
        !state.loading &&
          auth.login({ email: state.email, password: state.password })
      },
    },
    email: {
      name: "email",
      type: "text",
      required: true,
      pattern: "(.+)[@]mail.ru",
      onChange,
      onInvalid,
    },
    password: {
      name: "password",
      required: true,
      type: "password",
      pattern: "(\\d{1,6})",
      // pattern: "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
      onChange,
      onInvalid,
    },
    inputs: [
      { key: "email", name: "email", login: "Логин", value: "" },
      { key: "password", name: "password", login: "Логин", value: "" },
    ],
  }
}
