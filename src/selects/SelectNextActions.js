import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { Label, Select } from "components"
import axios from "services/ajax"

export const SelectNextActions = (props) => {
  const { taskId } = useParams()
  const [touched, setTouched] = useState(false)
  const [options, setOptions] = useState([])

  useEffect(() => {
    touched &&
      axios(`/tasks/${taskId}/nextstages`).then((res) => {
        console.log(res)
        setOptions(res.data.successResponse?.items)
      })
  }, [touched])

  return (
    <Label onClick={() => !touched && setTouched(true)} labelText="Дейсвие">
      <Select
        options={options}
        placeholder="Выберите дальнейшее действие"
        {...props}
      />
    </Label>
  )
}
