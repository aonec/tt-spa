import { devicesAmountTexts } from './CommunicationPipeListItem.constants';

export function getDevicesAmountText(devicesLength: number) {
  const nodesLengthLastDigit = devicesLength % 10;

  const devicesText = devicesAmountTexts.find(({ digits }) =>
    digits.includes(nodesLengthLastDigit)
  )?.text;

  return devicesText;
}
