import axios from "axios"

export function useCancel(cancel) {
  return {
    cancelToken: new axios.CancelToken((e) => {
      cancel = e
    }, cancel),
    cancel,
  }
}
