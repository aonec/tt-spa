import { GuidStringDictionaryItem } from 'myApi';

export const sortHousingManagementsListByAlphabet = (
  inspectors: GuidStringDictionaryItem[]
) => {
  const compare = (
    x: GuidStringDictionaryItem,
    y: GuidStringDictionaryItem
  ) => x.value!.localeCompare(y.value!);

  return inspectors.sort(compare);
};
