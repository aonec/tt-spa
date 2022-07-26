/* eslint-disable */

import axios from '../../api/axios';
import { createDevice } from '01/_api/utils';

const replaceURL = (url = '') => url.replace(/objects/, 'housingstocks');
const createTitle = ({ number, street }) =>
  street ? `${street}, ${number}` : null;

export const getInfo = async (url = '', dispatch = () => {}) => {
  try {
    const res = await axios.get(replaceURL(url));
    dispatch({
      type: 'success',
      data: { ...res, title: createTitle(res), info: true },
    });
  } catch (error) {}
};

export const getAparts = async (params = {}, dispatch = () => {}) => {
  try {
    const res = await axios.get('apartments', { params });
    dispatch({ type: 'success', data: { aparts: res } });
  } catch (error) {}
};

export const getDevices = async (url = '', dispatch = () => {}) => {
  try {
    const res = await axios.get(replaceURL(url));
    dispatch({
      type: 'success',
      data: {
        title: createTitle(res.housingStock),
        ...res,
        city: res.housingStock.city,
      },
    });
  } catch (error) {}
};

export const getEvents = async (
  { HousingStockId = null, DeviceId = null } = {},
  dispatch = () => {}
) => {
  try {
    const res = await axios.get('tasks', {
      params: {
        GroupType: 'NotArchived',
        Take: 3,
        HousingStockId,
        DeviceId,
      },
    });
  } catch (error) {}
};

export async function getApartmetns(params) {
  try {
    const res = await axios.get('apartments', { params });
    return { apartments: res };
  } catch (error) {}
}

export async function getApartmentInfo(id) {
  try {
    const res = await axios.all([
      axios.get(`apartments/${id}`),
      axios.get('MeteringDevices', { params: { ApartmentId: id } }),
    ]);
    const [apartInfo, meterDevices] = res;
    return {
      apartInfo,
      meterDevices: {
        ...meterDevices,
        items: meterDevices.items.map(createDevice),
      },
    };
  } catch (error) {}
}

export async function getDeviceInfo(id) {
  try {
    const res = await axios.all([
      axios.get(`devices/${id}`),
      //axios.get("MeteringDevices", { params: { ApartmentId: id } }),
    ]);
    const [apartInfo, meterDevices] = res;
    return {
      // apartInfo,
      // meterDevices: {
      //   ...meterDevices,
      //   items: meterDevices.items.map(createDevice),
      // },
    };
  } catch (error) {}
}

// Tasks?GroupType=NotArchived&Take=3&HousingStockId=${objectId}`
