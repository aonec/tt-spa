import axios from "../../axios";
import {ManagingFirmUserResponse} from "../../../myApi";

const initialState = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    cellphone: '',
    department: '',
    position: '',
    number: '',
    managementFirm: {
        id: 0,
        name: ''
    },
    userRoleIds: []
}


export async function getUser() {
    try {
        const res = await axios.get(`ManagingFirmUsers/current`)
        return res
    } catch (error) {
        console.log(error)
        throw {
            resource: 'roles',
            message: 'Произошла ошибка при загрузке данных пользователя',
        }
    }
}

interface SetUserInterface {
    type: 'SET_USER'
    payload: ManagingFirmUserResponse
}

export const setUser = (value: ManagingFirmUserResponse): SetUserInterface => ({
    type: 'SET_USER',
    payload: value,
})

export default function userReducer(state: ManagingFirmUserResponse = initialState, action: SetUserInterface): ManagingFirmUserResponse {
    return {...state, ...action.payload}
}
