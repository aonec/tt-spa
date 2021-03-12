import React from 'react'

import { AppContext } from '01/context'

export const useLoginPage = () => {
    const { isAuth, dispatch } = React.useContext(AppContext)
    const [email, setEmail] = React.useState({ value: '' })
    const [password, setPassword] = React.useState({ value: '' })

    const change = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'email') setEmail({ value })
        if (name === 'password') setPassword({ value })
    }

    const validData = () => email.value.trim() && password.value.trim()

    const submit = (e) => {
        e.preventDefault()
        if (validData()) {
            const data = { email: email.value, password: password.value }
            dispatch({ type: 'login', payload: { data } })
        }
    }

    return {
        email: { ...email, onChange: change, name: 'email' },
        password: {
            ...password,
            onChange: change,
            name: 'password',
            type: 'password',
        },
        btn: { disabled: !validData(), type: 'submit' },
        form: { onSubmit: submit },
    }
}
