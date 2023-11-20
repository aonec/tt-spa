import dayjs from 'dayjs';
import { downloadURI } from 'utils/downloadByURL';
import { DownloadTaskDocumentRequestPayload } from './distributeRecordsService.types';

export const downloadTaskDocument = ({
  documentResponse,
  appointmentDate,
  controller,
}: DownloadTaskDocumentRequestPayload) => {
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
