export default (state, action) => {
  switch (action.type) {
    case "cancel":
      return { ...state, cancelFetch: true }
    case "get":
      return {
        config: {
          url: "tasks",
          ...action.payload,
        },
        loading: true,
      }
    case "get_task_id":
      return {
        isCancel: true,
        config: {
          url: "Tasks/" + action.payload.taskId,
        },
      }
    case "auth":
      return {
        ...state,
        auth: true,
        config: {
          method: "post",
          url: "Auth/login",
          data: JSON.stringify(action.payload),
        },
      }
    case "fetch_success":
      return { ...action.payload }
    default:
      console.error("action type => ", action.type)
      return state
  }
}

function createParams(hash) {
  return hash.slice(1, 2).toUpperCase() + hash.slice(2)
}
