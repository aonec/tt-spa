export const getInputValue = (value: number | null) => {
  if (value === null) {
    return '';
  }

  return value;
};

export const getReadingValue = (value: string) => {
  if (!value) {
    return null;
  }
  return Number(value);
};
