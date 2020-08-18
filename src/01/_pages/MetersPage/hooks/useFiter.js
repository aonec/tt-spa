import React from "react"

const initialState = {
  city: "",
  street: "",
  house: "",
  apart: "",
}

function filterReducer(state, action) {
  const { payload, type } = action
  switch (type) {
    case "change":
      return { ...state, ...payload }

    default:
      break
  }
}

export const useFilter = (pageDispatch = () => {}) => {
  const [state, dispatch] = React.useReducer(filterReducer, initialState)
  const { city, street, house, apart } = state

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (city && street && house) {
        pageDispatch({
          type: "get_apartments",
          params: { city, street, HousingStockNumber: house },
        })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [city, street, house])

  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch({ type: "change", payload: { [name]: value } })
  }

  return {
    filter: apart,
    inputs: [
      {
        name: "city",
        value: city,
        placeholder: "Город",
        onChange,
      },
      {
        name: "street",
        value: street,
        placeholder: "Улица",
        onChange,
      },
      {
        name: "house",
        value: house,
        placeholder: "Дом",
        onChange,
      },
      {
        name: "apart",
        value: apart,
        placeholder: "Кв.",
        onChange,
      },
    ],
  }
}
