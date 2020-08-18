import { useContext } from "react"
import { GlobalStoreContext } from "./context"

export const useGlobalStore = () => {
  return useContext(GlobalStoreContext)
}
