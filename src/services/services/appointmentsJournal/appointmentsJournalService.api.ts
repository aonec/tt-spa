import { axios } from '01/axios';
import { createQuery } from '@farfetched/core';
import { AssignmentResponse } from 'myApi';
import {
  DownloadControllerWorkFileRequestPayload,
  GetAssigmentsRequestPayload,
} from './appointmentsJournalService.types';
import { downloadURI } from 'utils/downloadByURL';

export const individualSealAssignmentsQuery = createQuery<
  GetAssigmentsRequestPayload,
  AssignmentResponse[]
>({
  handler: (params) => axios.get('IndividualSeal/Assignments', { params }),
});

export const downloadСontrollerWorkFileQuery = createQuery<
  DownloadControllerWorkFileRequestPayload,
  void
>({
  handler: async ({ controllerId, ...params }) => {
    const res: string = await axios.get(
      `IndividualSeal/Controllers/${controllerId}/WorkFile`,
      {
        params,
        responseType: 'blob',
      },
    );

    const url = window.URL.createObjectURL(new Blob([res]));

    downloadURI(url, 'задания');
  },
});
