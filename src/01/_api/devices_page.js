import axios from '01/axios';


export const devicesAPI = {
    async getDevices(pageNumber, pageSize, searchTerm) {
        try {
            const res = await axios.get(`Calculators/?pageNumber=${pageNumber}&pageSize=${pageSize}${searchTerm ? `&Question=${searchTerm}` : ''}`)
            return res
        } catch (error) {
        }
    },
    async getDevicesBySerialNumber(serialNumber) {
        try {
            const res = await axios.get(`Calculators?Question=${serialNumber}&pageNumber=${1}&pageSize=${10}`);
                if (res.totalItems === 0) {
                    return
                }
            return res
        } catch (error) {

        }
    }

}