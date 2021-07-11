interface ReadingObjectInterface {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
}

export const formEmptyReadingsObject = (
  numberOfReadings: number,
): Partial<ReadingObjectInterface> => {
  const emptyObject: Partial<ReadingObjectInterface> = {};
  for (let i = 1; i <= numberOfReadings; i++) {
    const index = `value${i}` as keyof ReadingObjectInterface;
    emptyObject[index] = '0';
  }
  return emptyObject;
};
