import React from "react"
import { AppContext } from "01/context"

export function useAppContext() {
  return React.useContext(AppContext)
}
