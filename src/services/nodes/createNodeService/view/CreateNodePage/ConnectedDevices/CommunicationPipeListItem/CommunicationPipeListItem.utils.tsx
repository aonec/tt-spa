import { devicesCountTexts } from './CommunicationPipeListItem.constants';

export function getDevicesCountText(devicesLength: number) {
  const nodesLengthLastDigit = devicesLength % 10;

  const devicesText = devicesCountTexts.find(({ digits }) =>
    digits.includes(nodesLengthLastDigit),
  )?.text;

  return devicesText;
}
