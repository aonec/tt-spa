export const useMeterDevices = ({ meterDevices = {} }) => {
  const { items = [] } = meterDevices;

  return {
    items: items.map((item) => ({ ...item })),
  };
};