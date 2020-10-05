import { CHANGE_INPUT_VALUE } from './constants';

export function onChangeFormValueByPath(name, val) {
  return {
    type: CHANGE_INPUT_VALUE,
    payload: { [name]: val },
  };
}
