import { ControllerResponse } from 'api/types';
import dayjs from 'dayjs';
import { downloadURI } from 'utils/downloadByURL';

export const downloadTaskDocument = (
  documentResponse: string,
  appointmentDate: string,
  controller: ControllerResponse,
) => {
  const url = window.URL.createObjectURL(new Blob([documentResponse]));

  const fullName = [
    controller?.firstName,
    controller?.lastName,
    controller?.middleName,
  ]
    .filter(Boolean)
    .join('_');

  downloadURI(
    url,
    `задание_${dayjs(appointmentDate).format('DD.MM.YYYY')}_${fullName}`,
    false,
  );
};
