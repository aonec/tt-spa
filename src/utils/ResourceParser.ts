interface resourceDTO {
  key: string;
  value: string;
}
interface resourceType {
  label: string;
  value: string;
}

export const resourceParser = (response: resourceDTO[]): resourceType[] => {
  return response.reduce((acc: resourceType[], el: resourceDTO) => {
    acc.push({
      label: el.value,
      value: el.key,
    });
    return acc;
  }, []);
};
