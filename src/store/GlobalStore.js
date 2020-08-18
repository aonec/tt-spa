import React, { useMemo } from "react"

import { GlobalStoreContext } from "./context"
import reducer from "./reducer"
// import { request } from "services/api"
// import { useLocation } from "react-router-dom"

export const GlobalStore = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {})

  return (
    <GlobalStoreContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStoreContext.Provider>
  )
}
