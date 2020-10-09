import axios from '01/axios';


export const devicesAPI = {
    async getDevices(pageNumber, pageSize) {
        try {
            const res = await axios.get(`MeteringDevices/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
                // .then((response) => response.items);
            return res
        } catch (error) {
        }
    },

    async getRelatedDevices(deviceId) {
        try {
            const res = await axios.get(`MeteringDevices/related?DeviceId=${deviceId}`);
            return res
        } catch (error) {

        }
    },

    async getDevicesBySerialNumber(serialNumber) {
        try {
            const res = await axios.get(`MeteringDevices/?SerialNumber=${serialNumber}`);
                if (res.totalItems === 0) {
                    alert('Прибора с таким серийным номером не существует')
                    return
                }
            return res
        } catch (error) {

        }
    }

}