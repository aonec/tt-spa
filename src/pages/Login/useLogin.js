// import { useEffect, useState } from "react"
// import { useHistory } from "react-router-dom"
// import { useInput } from "hooks"
// import { useGlobalStore } from "store"

// import { auth } from "services/api"
// const defaultInputProps = {
//   big: true,
//   required: true,
// }

// export const useLogin = () => {
//   // const [, dispatch] = useGlobalStore()
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const { push } = useHistory()
//   const email = useInput({
//     name: "email",
//     placeholder: "Введите логин",
//     loading,
//     ...defaultInputProps,
//   })
//   const password = useInput({
//     name: "password",
//     placeholder: "Введите пароль",
//     password: true,
//     loading,
//     ...defaultInputProps,
//   })

//   // useEffect(() => {
//   //   if (data) {
//   //     setLoading(true)
//   //     auth("login", { data })
//   //       .then(() => push("/"))
//   //       .catch(() => {
//   //         setLoading(false)
//   //       })
//   //   }
//   // eslint-disable-next-line
//   // }, [data])

//   const submit = (e) => {
//     e.preventDefault()
//     if (!email.error && !password.error) {
//       setData({ ...email.data, ...password.data })
//       // push("/")
//       dispatch({ type: "auth", payload: { ...email.data, ...password.data } })
//     }
//   }
//   return {
//     email: email.comp,
//     password: password.comp,
//     disabled: email.error || password.error || loading,
//     submit,
//   }
// }
import React from "react"

export const useLoginState = (props) => {
  const [state, dispatch] = React.useReducer(reducer, {})
  return [state, dispatch]
}

function reducer(state, action) {}
