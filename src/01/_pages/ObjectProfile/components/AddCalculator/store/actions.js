import {CHANGE_INPU_VALUE} from './constants'

export function changeInputVal(name, val) {
    return{
        type: CHANGE_INPU_VALUE,
        payload: {[name]: val}
    }
}
