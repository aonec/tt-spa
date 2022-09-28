import { OrganizationUserResponse } from '../../../myApi';

const initialState = {};

interface SetUserInterface {
  type: 'SET_USER';
  payload: OrganizationUserResponse;
}

export const setUser = (value: any): SetUserInterface => ({
  type: 'SET_USER',
  payload: value,
});

export default function userReducer(
  state: any = initialState,
  action: SetUserInterface
): OrganizationUserResponse {
  return { ...state, ...action.payload };
}
