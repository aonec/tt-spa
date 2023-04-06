import { systemsAmountTexts } from './NodesGroup.constants';

export function getSystemText(nodesLength: number) {
  const nodesLengthLastDigit = nodesLength % 10;

  const systemText = systemsAmountTexts.find(({ digits }) =>
    digits.includes(nodesLengthLastDigit),
  )?.text;

  return systemText;
}
