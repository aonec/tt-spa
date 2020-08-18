import React from "react"

export const useSelectList = () => {
  const [focus, setFocus] = React.useState(-1)

  return { focus, setFocus }
}
