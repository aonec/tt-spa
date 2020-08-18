import axios from '01/axios'

const replaceURL = (url = '') => url.replace(/objects/, 'housingstocks')
const createTitle = ({ number, street }) =>
  street ? `${street}, ${number}` : null

export const getInfo = async (url = '', dispatch = () => {}) => {
  try {
    const res = await axios.get(replaceURL(url))
    dispatch({
      type: 'success',
      data: { ...res, title: createTitle(res), info: true },
    })
  } catch (error) {}
}

export const getAparts = async (params = {}, dispatch = () => {}) => {
  try {
    const res = await axios.get('apartments', { params })
    dispatch({ type: 'success', data: { aparts: res } })
  } catch (error) {}
}

export const getDevices = async (url = '', dispatch = () => {}) => {
  try {
    const res = await axios.get(replaceURL(url))
    console.log(res)
    dispatch({
      type: 'success',
      data: {
        title: createTitle(res.housingStock),
        ...res,
        city: res.housingStock.city,
      },
    })
  } catch (error) {}
}

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
    })
    console.log(res)
  } catch (error) {}
}

// Tasks?GroupType=NotArchived&Take=3&HousingStockId=${objectId}`
