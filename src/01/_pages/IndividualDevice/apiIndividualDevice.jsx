import axios from '../../axios'

export async function getIndividualDevice(id = '') {
    try {
        const res = await axios.get(`IndividualDevices/${id}`)
        console.log('res', res)
        return res
    } catch (error) {
        console.log(error)
        throw {
            resource: 'device',
            message: 'Произошла ошибка запроса устройства',
        }
    }
}

export async function getIndividualDeviceTasks(id = '') {
    try {
        const res = axios.get(`Tasks?DeviceId=${id}`)
        return res
    } catch (error) {
        console.log(error)
        throw {
            resource: 'tasks',
            message: 'Произошла ошибка при загрузке данных по задачам',
        }
    }
}
