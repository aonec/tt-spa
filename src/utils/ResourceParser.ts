interface axiosResponse {
  key: string;
  value: string;
}
interface reduceResponse {
  label: string;
  value: string;
}

export const resourceParser = (response: axiosResponse[]): reduceResponse[] => {
  return response.reduce((acc: reduceResponse[], el: axiosResponse) => {
    acc.push({
      label: el.value,
      value: el.key,
    });
    return acc;
  }, []);
};
