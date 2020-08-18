import React, { useReducer, useEffect } from "react"
import t from "prop-types"

import { SelectContext } from "./context"
import reducer from "./reducer"
import { Container } from "./Container"
import { Field } from "./Field"
import { List } from "./List"
import { Single } from "./Single"
import { Multiple } from "./Multiple"

// const mock = [
//   { id: 1, name: "test 1", icon: "map" },
//   { id: 2, name: "test 2" },
//   { id: 3, name: "test 3" },
//   { id: 4, name: "test 4" },
//   { id: 5, name: "test 5" },
//   { id: 6, name: "test 6" },
//   { id: 7, name: "test 7" },
//   { id: 8, name: "test 8" },
//   { id: 9, name: "test 9" },
// ]

export const Select = ({
  big = false,
  placeholder = null,
  multiple = false,
  options = null,
  defaultId = [],
  getSelectData = () => {},
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, {
    big,
    defaultId,
    focus: null,
    items: options
      ? options.map((item) => ({
          ...item,
          checked: defaultId.includes(item.id),
        }))
      : [],
    multiple,
    open: false,
    placeholder,
  })
  const { items } = state
  useEffect(() => {
    if (options) {
      dispatch({ type: "update", payload: { options } })
    }
  }, [options])

  useEffect(() => {
    const ids = items.reduce(
      (arr, item) => (item.checked ? [...arr, item.id] : arr),
      []
    )
    if (multiple) {
      getSelectData(ids)
    } else {
      getSelectData(ids[0] ?? null)
    }
    // eslint-disable-next-line
  }, [items])

  return (
    <SelectContext.Provider value={{ state, dispatch }}>
      <Container {...props}>
        <Field>
          <Single />
          <Multiple />
        </Field>
        <List />
      </Container>
    </SelectContext.Provider>
  )
}

Select.propTypes = {
  big: t.bool,
  name: t.string,
  multiple: t.bool,
  options: t.arrayOf(
    t.shape({
      id: t.oneOfType([t.string, t.number]).isRequired,
      name: t.string.isRequired,
      icon: t.string,
    })
  ),
  defaultId: t.array,
  getSelectData: t.func,
}
