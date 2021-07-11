import { devicesAPI } from '../../_api/devices_page';

const SET_DEVICES = 'SET_DEVICES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
const SET_IS_LOADING = 'SET_IS_LOADING';

const initialState = {
  totalItems: 0,
  pageNumber: 1,
  pageSize: 5,
  totalPages: 48,
  hasPreviousPage: false,
  hasNextPage: true,
  nextPageNumber: 2,
  previousPageNumber: 1,
  items: [],
  currentPage: 1,
  isLoading: false,
};

export default function reducerDevicesPage(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICES:
      return { ...state, ...action.devices };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };

    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };

    default:
      return state;
  }
}

export const setDevices = (devices) => ({ type: SET_DEVICES, devices });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setIsLoading = (isLoading) => ({
  type: SET_IS_LOADING,
  isLoading,
});

export const getDevices = (pageNumber, pageSize, searchState) => async (
  dispatch,
) => {
  dispatch(setIsLoading(true));
  const devices = await devicesAPI.getDevices(
    pageNumber,
    pageSize,
    searchState,
  );
  if (!devices) {
    dispatch(setIsLoading(false));
    return;
  }
  dispatch(setDevices(devices));
  dispatch(setIsLoading(false));
};

export const getDevicesBySerialNumber = (serialNumber) => async (dispatch) => {
  dispatch(setIsLoading(true));

  const devices = await devicesAPI.getDevicesBySerialNumber(serialNumber);
  if (!devices) {
    dispatch(setIsLoading(false));
    return;
  }
  dispatch(setDevices(devices));
  dispatch(setIsLoading(false));
};
