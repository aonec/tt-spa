import { axios } from 'api/axios';
import { createQuery } from '@farfetched/core';
import { AssignmentResponse } from 'api/types';
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
