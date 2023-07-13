import axios from '01/axios';

export const reopenIndividualDevice = async (deviceId: number) => {
  return await axios.post(`IndividualDevices/${deviceId}/reopen`);
};
