import {useState} from "react";

const useAccessesList = (accessName: string) => {
    const permissions = localStorage.getItem('permissions');
    const initialState = JSON.parse(permissions || '')
    const [state, setState] = useState(initialState);
    const show = (accessName: string) => state.includes(accessName);
    return {show, state}
}

export default useAccessesList;