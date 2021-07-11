import { ManagingFirmUserResponse } from '../../../myApi';

const initialState = {};

interface SetUserInterface {
  type: 'SET_USER';
  payload: ManagingFirmUserResponse;
}

export const setUser = (value: any): SetUserInterface => ({
  type: 'SET_USER',
  payload: value,
});

export default function userReducer(
  state: any = initialState,
  action: SetUserInterface,
): ManagingFirmUserResponse {
  return { ...state, ...action.payload };
}
