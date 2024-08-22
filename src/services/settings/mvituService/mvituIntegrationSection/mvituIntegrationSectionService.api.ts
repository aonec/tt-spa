import { axios } from 'api/axios';

export const getData = () => axios.get('/api/data');
