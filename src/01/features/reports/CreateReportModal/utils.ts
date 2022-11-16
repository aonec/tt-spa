import { UnloadingType } from './ReportFormInputs/closedIndividualDevicesFormService/closedIndividualDevicesFormService.types';

export function downloadURI(uri: string, name: string, isZipped?: boolean) {
  const link = document.createElement('a');

  link.download = name;
  link.href = uri;
  link.setAttribute('download', `${name}.${isZipped ? 'zip' : 'xlsx'}`);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

export function getUnloadPlaceData(
  unloadType: UnloadingType | null,
  data: {
    [key: string]: string | null | number;
  }
) {
  if (!unloadType) return {};

  const UnloadTypeFieldsDictionary: {
    [key in UnloadingType]: string;
  } = {
    [UnloadingType.AllManagingFirm]: 'managementFirmId',
    [UnloadingType.ByAddress]: 'housingStockId',
    [UnloadingType.ByHouseManagement]: 'houseManagementId',
  };

  const key = UnloadTypeFieldsDictionary[unloadType];

  return { [key]: data[key] };
}
