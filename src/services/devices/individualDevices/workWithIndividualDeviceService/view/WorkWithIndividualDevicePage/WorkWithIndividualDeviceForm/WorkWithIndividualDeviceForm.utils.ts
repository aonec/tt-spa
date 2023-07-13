export const dataKey = 'work-with-individual-device-form';

export const getDataKey = (condition: boolean) => {
  if (condition) {
    return dataKey;
  }
  return undefined;
};
