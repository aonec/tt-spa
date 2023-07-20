import axios from 'api/axios';

export const reopenIndividualDevice = async (deviceId: number) => {
  return await axios.post(`IndividualDevices/${deviceId}/reopen`);
};
