import axios from "axios"
export const useCanselToken = () => {
  const source = axios.CancelToken.source()
  return { token: source.token, cancel: source.cancel }
}
