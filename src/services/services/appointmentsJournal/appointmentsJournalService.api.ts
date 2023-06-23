import { axios } from '01/axios';
import { createQuery } from '@farfetched/core';
import { AssingmentResponse } from 'myApi';
import {
  DownloadControllerWorkFileRequestPayload,
  GetAssigmentsRequestPayload,
} from './appointmentsJournalService.types';
import { downloadURI } from 'utils/downloadByURL';

export const individualSealAssignmentsQuery = createQuery<
  GetAssigmentsRequestPayload,
  AssingmentResponse[]
>({
  handler: (params) => axios.get('IndividualSeal/Assignments', { params }),
});

export const downloadСontrollerWorkFileQuery = createQuery<
  DownloadControllerWorkFileRequestPayload,
  void
>({
  handler: async ({ controllerId, ...params }) => {
    const res: string = await axios.get(
      `/api/IndividualSeal/Controllers/${controllerId}/WorkFile`,
      {
        params,
        responseType: 'blob',
      },
    );

    const url = window.URL.createObjectURL(new Blob([res]));

    downloadURI(url, 'задания');
  },
});
