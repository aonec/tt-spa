import { sample, combine } from 'effector';
import {
  $isCheckCreationDeviceFormDataModalOpen,
  addIndividualDeviceForm,
  cancelCheckingButtonClicked,
  checkBeforSavingButtonClicked,
  createIndividualDeviceFx,
  checkIndividualDeviceFx,
} from './index';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';

$isCheckCreationDeviceFormDataModalOpen
  .on(checkBeforSavingButtonClicked, () => true)
  .reset([
    cancelCheckingButtonClicked,
    createIndividualDeviceFx.doneData,
    checkIndividualDeviceFx.doneData,
  ]);

sample({
  source: combine(
    individualDeviceMountPlacesService.outputs.$individualDeviceMountPlaces,
    addIndividualDeviceForm.fields.mountPlaceId.$value,
    (places, name) => places?.find((elem) => elem.name === name)?.id || null,
  ),
  clock:
    individualDeviceMountPlacesService.outputs.$individualDeviceMountPlaces,
  target: addIndividualDeviceForm.fields.mountPlaceId.set,
});
