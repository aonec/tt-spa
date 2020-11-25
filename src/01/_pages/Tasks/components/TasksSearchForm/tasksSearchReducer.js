const SET_SEARCHTERM = 'SET_SEARCHTERM';
const SET_DEVICES_FILTER = 'SET_DEVICES_FILTER';
const SET_TASKS_TYPE = 'SET_TASKS_TYPE'

const tasksSearchReducer = (state, action) => {

    switch (action.type) {

        case SET_SEARCHTERM:
            return { ...state, searchTerm: action.searchTerm }

        case SET_TASKS_TYPE:
            return {...state, taskTypeNumber: action.taskTypeNumber}


        // case SET_DEVICES_FILTER:
        //     switch (action.filterParameter) {
        //         case "descendingFutureCheckingDate":
        //             return { ...state, destination: "Descending", rule: "FutureCheckingDate" }
        //
        //         case "ascendingFutureCheckingDate":
        //             return { ...state, destination: "Ascending", rule: "FutureCheckingDate" }
        //
        //         case "descendingStreet":
        //             return { ...state, destination: "Descending", rule: "Street" }
        //
        //         case "ascendingStreet":
        //             return { ...state, destination: "Ascending", rule: "Street" }
        //     }

        default:
            return state
    }

}

export const setSearchTerm = (searchTerm) => ({ type: SET_SEARCHTERM, searchTerm});
export const setTaskType = (taskTypeNumber) => ({ type: SET_TASKS_TYPE, taskTypeNumber});
export const setDevicesFilter = (filterParameter) => ({ type: SET_DEVICES_FILTER, filterParameter});

export default tasksSearchReducer;