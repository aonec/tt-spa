import { devicesAPI } from '../../_api/devices_page';

const SET_DEVICES = 'SET_DEVICES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

const initialState = {
  totalItems: 0,
  pageNumber: 1,
  pageSize: 10,
  totalPages: 48,
  hasPreviousPage: false,
  hasNextPage: true,
  nextPageNumber: 2,
  previousPageNumber: 1,
  devices: [],
  currentPage: 1,
};

export default function reducerDevicesPage(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICES:
      return { ...state, devices: [...action.devices] };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage}

    default: return state;
  }

}

export const setDevices = (devices) => ({ type: SET_DEVICES, devices });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage})

export const getDevices = (pageNumber, pageSize) => async (dispatch) => {
  const devices = await devicesAPI.getDevices(pageNumber, pageSize);
  const devicesWithRelated = await Promise.all(devices.map(async (d) => {
    const relatedDevices = await devicesAPI.getRelatedDevices(d.id);
    // if (!relatedDevices.length) return {...d, relatedDevices}
    return { ...d, relatedDevices: [...relatedDevices] };
  }));
  dispatch(setDevices(devicesWithRelated));
};
