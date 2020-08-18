import { useReducer, useMemo } from "react"

export const useUploadReducer = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "get_input_files":
          const inputFiles = action.payload
          const files = []
          const formData = new FormData()
          for (let i in inputFiles) {
            // console.log(i)
          }
          console.log(typeof inputFiles)
          return { ...state }

        default:
          console.warn("upload ==> ", action.type)
          return state
      }
    },
    { files: [] }
  )

  return useMemo(() => [state, dispatch], [state, dispatch])
}
