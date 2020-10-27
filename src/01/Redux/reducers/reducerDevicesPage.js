import { devicesAPI } from '../../_api/devices_page';

const SET_DEVICES = 'SET_DEVICES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';

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
      return { ...state, currentPage: action.currentPage}

    case TOGGLE_IS_LOADING:
      return { ...state, isLoading: !state.isLoading}

    default: return state;
  }

}

export const setDevices = (devices) => ({ type: SET_DEVICES, devices });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage});
export const toggleIsLoading = () => ({ type: TOGGLE_IS_LOADING});


// const deviceFilterFunction = (item) => {
//   if (item.id.toString().includes(searchTerm) || item.relatedDevices.some((subItem) => subItem.id.toString().includes(searchTerm))) {
//     return true
//   }
//   return false
// }


export const getDevices = (pageNumber, pageSize) => async (dispatch) => {
  dispatch(toggleIsLoading());
  const devices = await devicesAPI.getDevices(pageNumber, pageSize);
  // const devicesWithRelated = await Promise.all(devices.items.map(async (d) => {
  //   const relatedDevices = await devicesAPI.getRelatedDevices(d.id);
  //   if (!relatedDevices.length) return {...d, relatedDevices}
  //   return { ...d, relatedDevices: [...relatedDevices] };
  // }));
  // const devicesWithFullInfo = {...devices, items:[...devicesWithRelated]}
  dispatch(toggleIsLoading());
  dispatch(setDevices(devices));
};

export const getDevicesBySerialNumber = (serialNumber) => async (dispatch) => {
  dispatch(toggleIsLoading());
  const devices = await devicesAPI.getDevicesBySerialNumber(serialNumber);

  if (!devices) {
    dispatch(toggleIsLoading());
    return;
  }

  // if (devices.items.length === 1) {
  //   const relatedDevices = await devicesAPI.getRelatedDevices(devices.items[0].id) || [];
  //   devices.items[0].relatedDevices = [...relatedDevices];
  //   dispatch(toggleIsLoading());
  //   dispatch(setDevices(devices));
  // } else {
  //   const devicesWithRelated = await Promise.all(devices.items.map(async (d) => {
  //     d.relatedDevices = [];
  //
  //     // const relatedDevices = await devicesAPI.getRelatedDevices(d.id);
  //     // d.relatedDevices = [...relatedDevices]
  //     // if (!relatedDevices.length) return {...d, relatedDevices}
  //     // return { ...d, relatedDevices: [...relatedDevices] };
  //     return d
  //   }));
  //   const devicesWithFullInfo = {...devices, items:[...devicesWithRelated]}
  //   dispatch(toggleIsLoading());
  //   dispatch(setDevices(devicesWithFullInfo));
  // }

}




