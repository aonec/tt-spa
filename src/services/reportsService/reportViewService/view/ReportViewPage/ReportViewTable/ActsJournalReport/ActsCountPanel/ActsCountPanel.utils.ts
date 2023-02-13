import { actsCountTexts } from "./ActsCountPanel.constants";

export const getActsCountText = (actsCount: number) => {
  const actsCountText = actsCountTexts.find(({ digits }) => {
    return digits.some((digit) => {
      return String(actsCount).endsWith(String(digit));
    });
  });

  return actsCountText?.text || null;
};
