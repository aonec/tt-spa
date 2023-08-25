export type DigitCountText = {
  digits: number[];
  text: string;
};

export type DigitCountTextList = DigitCountText[];

export const getCountText = (
  actsCount: number,
  countTexts: DigitCountTextList,
) => {
  const countText = countTexts.find(({ digits }) => {
    return digits.some((digit) => {
      return String(actsCount).endsWith(String(digit));
    });
  });

  return countText?.text || null;
};
