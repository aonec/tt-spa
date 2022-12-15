import { axios } from '01/axios';

export const fetchCloseCalculator = () => axios.post('MeteringDevices/close');
