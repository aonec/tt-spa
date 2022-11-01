import { axios } from '01/axios';

export const fetchIndividualDevices = () => axios.get('devices/individual');
