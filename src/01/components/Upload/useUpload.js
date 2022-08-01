/* eslint-disable */

import React from 'react';
import { deleteDoc } from '../../_api/task_profile_page';
import { uploadFile } from '../../_api/upload';

const DELETE_FILE = 'DELETE_FILE';

function uploadReducer(state, action) {
  const { type, data, file } = action;
  const { fileList } = state;
  switch (type) {
    case 'change':
      return { ...state, file, loading: true };
    case 'success':
      return {
        ...state,
        fileList: [...fileList, data.newFile],
        file: null,
        loading: false,
      };
    case DELETE_FILE:
      return {
        ...state,
        fileList: fileList.filter((file) => file.id !== action.fileId),
      };
    default:
      console.error('upload', type);
      return state;
  }
}

const deleteFileAC = (fileId) => ({ type: DELETE_FILE, fileId });

export const useUpload = (callback = () => {}) => {
  const [state, dispatch] = React.useReducer(uploadReducer, {
    file: null,
    fileList: [],
  });
  React.useEffect(() => {
    const { file = null, fileList = [] } = state;
    if (file) {
      uploadFile(file).then((data) => dispatch({ type: 'success', data }));
    }
    callback({ documentsIds: fileList.map((i) => i.id) });
  }, [state]);

  const deleteFile = (id) => async () => {
    let response = await deleteDoc(id);
    await dispatch(deleteFileAC(id));
    return response;
  };

  return {
    button: {
      onChange(file) {
        dispatch({ type: 'change', file });
      },
      loading: state.loading,
    },
    list: { items: state.fileList, del: deleteFile },
  };
};

export const useCustomUpload = () => {};
