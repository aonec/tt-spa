export const getInputValue = (value: number | null) => {
  if (value) return value;

  return typeof value === 'number' ? value : '';
};

export const getReadingValue = (value: string) => {
  if (!value) {
    return null;
  }
  return Number(value);
};
