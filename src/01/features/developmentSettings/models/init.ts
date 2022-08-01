import { closeDevSettingsModal, devSettingsForm } from './index';
import { $isDevSettingsModalOpen, openDevSettingsModal } from '.';
import { axios } from '../../../../api/axios';

$isDevSettingsModalOpen
  .on(openDevSettingsModal, () => true)
  .reset(closeDevSettingsModal);

devSettingsForm.fields.devUrl.$value.watch((url) => {
  axios.defaults.baseURL = url;
});
