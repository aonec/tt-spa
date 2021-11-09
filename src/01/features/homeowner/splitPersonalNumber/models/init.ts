import {
  homeownerAccountForSplittedApartmentForm,
  newApartmentPersonalNumberForm,
  previousSplitPersonalNumberPage,
  saveSplitPersonalNumberForm,
  transferDevicesForm,
} from './index';
import {
  $splitPersonalNumberStageNumber,
  nextSplitPersonalNumberPage,
} from '.';
import { forward, sample } from 'effector';

$splitPersonalNumberStageNumber
  .on(nextSplitPersonalNumberPage, (value) => (value === 3 ? value : value + 1))
  .on(previousSplitPersonalNumberPage, (value) =>
    value === 1 ? value : value - 1
  );

forward({
  from: homeownerAccountForSplittedApartmentForm.formValidated,
  to: nextSplitPersonalNumberPage,
});

forward({
  from: newApartmentPersonalNumberForm.formValidated,
  to: nextSplitPersonalNumberPage,
});

forward({
  from: transferDevicesForm.formValidated,
  to: saveSplitPersonalNumberForm,
});
