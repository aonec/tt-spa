import React from "react"
import { cancel } from "01/axios"

export const useCancelFetch = (triger = []) => {
  React.useEffect(() => () => typeof cancel === "function" && cancel(), triger)
}
