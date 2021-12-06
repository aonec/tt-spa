const SET_SEARCHTERM = 'SET_SEARCHTERM';
const SET_DEVICES_FILTER = 'SET_DEVICES_FILTER';
const SET_TASKS_TYPE = 'SET_TASKS_TYPE';
const SET_TASK_ID = 'SET_TASK_ID';

const tasksSearchReducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCHTERM:
      return { ...state, searchTerm: action.searchTerm };

    case SET_TASK_ID:
      return { ...state, taskId: action.taskId };

    case SET_TASKS_TYPE:
      return { ...state, taskTypeNumber: action.taskTypeNumber };

    default:
      return state;
  }
};

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCHTERM,
  searchTerm,
});
export const setTaskType = (taskTypeNumber) => ({
  type: SET_TASKS_TYPE,
  taskTypeNumber,
});
export const setTaskId = (taskId) => ({ type: SET_TASK_ID, taskId });
export const setDevicesFilter = (filterParameter) => ({
  type: SET_DEVICES_FILTER,
  filterParameter,
});

export default tasksSearchReducer;
