
import axios from '01/axios';


export const devicesAPI = {
    async getDevices() {
        try {
            const res = await axios.get(`MeteringDevices/?pageNumber=1&pageSize=20`)
                .then(response => response.items);
            return res
        } catch (error) {}
    }
}