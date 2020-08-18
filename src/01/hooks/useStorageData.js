import React from "react"
export function useStorageData() {
  React.useEffect(() => () => sessionStorage.removeItem("data"), [])
  const data = JSON.parse(sessionStorage.getItem("data"))
  return data ?? {}
}
