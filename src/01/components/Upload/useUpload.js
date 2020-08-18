import React from "react"
import { uploadFile } from "01/_api/upload"

function uploadReducer(state, action) {
  const { type, data, file } = action
  const { fileList } = state
  switch (type) {
    case "change":
      return { ...state, file, loading: true }
    case "success":
      return {
        ...state,
        fileList: [...fileList, data.newFile],
        file: null,
        loading: false,
      }
    default:
      console.error("upload", type)
      return state
  }
}

export const useUpload = (callback = () => {}) => {
  const [state, dispatch] = React.useReducer(uploadReducer, {
    file: null,
    fileList: [],
  })
  React.useEffect(() => {
    const { file = null, fileList = [] } = state
    if (file) {
      uploadFile(file).then((data) => dispatch({ type: "success", data }))
    }
    callback({ documentsIds: fileList.map((i) => i.id) })
  }, [state])
  // console.log(state)
  return {
    button: {
      onChange(e) {
        dispatch({ type: "change", file: e.target.files[0] })
      },
      loading: state.loading,
    },
    list: { items: state.fileList, del: () => {} },
  }
}