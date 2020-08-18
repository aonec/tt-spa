import React, { useState, useRef } from "react"
import { Input } from "components"

export const useInput = ({
  name = "",
  big = false,
  password = false,
  required = false,
  loading = false,
}) => {
  const [value, setValue] = useState("")
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState(false)
  // const [valid, setValid] = useState(false)
  const input = useRef()

  const onClick = () => !touched && setTouched(true)
  const onFocus = () => input.current.focus()
  const onBlur = () => {
    if (touched && !value) {
      setError(true)
    }
  }

  const onInvalid = (e) => {
    e.preventDefault()
    setError(true)
  }

  const onChange = (e) => {
    error && setError(false)
    setValue(e.target.value)
  }

  return {
    comp: (
      <Input
        loading={loading}
        required={required}
        error={error}
        ref={input}
        value={value}
        onInvalid={onInvalid}
        onChange={onChange}
        password={password}
        big={big}
        wrapper={{ onFocus, onClick, onBlur }}
      />
    ),
    data: { [name]: value },
    error,
  }
}
