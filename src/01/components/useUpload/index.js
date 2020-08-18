import React, { useEffect, useReducer } from "react"

import axios from "01/axios"
import { UploadBtn } from "./UploadBtn"
import { UploadList } from "./UploadList"

export const useUpload = ({ big } = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    preloadList: [],
    list: [],
    files: null,
    loading: false,
    deleteId: null,
  })
  const { formData, deleteId, loading, list } = state

  useEffect(() => {
    if (formData) {
      axios
        .post("Documents/upload", formData)
        .then((data) =>
          dispatch({ type: "success_upload", payload: Object.values(data) })
        )
    }
    if (deleteId) {
      axios
        .delete(`Documents/${deleteId}`)
        .then(() => dispatch({ type: "success_delete", payload: deleteId }))
    }
  }, [formData, deleteId])

  const bntProps = {
    loading,
    big,
    change: ({ target }) =>
      dispatch({ type: "get_input_files", payload: target.files }),
  }

  const listProps = {
    loading,
    list,
    files: state.files,
    click: (id) => dispatch({ type: "delete", payload: id }),
  }

  return {
    uploadButton: <UploadBtn {...bntProps} />,
    uploadList: <UploadList {...listProps} />,
    filesIds: !list.length ? null : list.map((item) => item.id),
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "get_input_files":
      return getInputFiles(state, action)
    case "success_upload":
      const arr = action.payload
      return {
        ...state,
        list: [...new Set([...arr, ...state.list])],
        loading: false,
        formData: null,
        files: null,
      }
    case "delete":
      return { ...state, deleteId: action.payload, loading: true }
    case "success_delete":
      return {
        ...state,
        deleteId: null,
        loading: false,
        list: state.list.filter((item) => item.id !== action.payload),
      }
    default:
      console.warn("update ==> ", action.type)
      return state
  }
}

function getInputFiles(state, action) {
  const files = action.payload
  const formData = createFormData(files)
  return { ...state, formData, files, loading: true }
}

function createFormData(files) {
  const formData = new FormData()
  Object.values(files).forEach((item, i) => {
    formData.append("file" + i, item)
  })
  return formData
}
