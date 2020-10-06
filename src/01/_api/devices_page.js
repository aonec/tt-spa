import axios from '01/axios';


export const devicesAPI = {
    async getDevices() {
        try {
            const res = await axios.get(`MeteringDevices/?pageNumber=1&pageSize=5`)
                .then(response => response.items);
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
    }

}