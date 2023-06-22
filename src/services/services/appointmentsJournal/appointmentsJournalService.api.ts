import { axios } from '01/axios';
import { createQuery } from '@farfetched/core';
import { AssingmentResponse } from 'myApi';
import { GetAssigmentsRequestPayload } from './appointmentsJournalService.types';

export const individualSealAssignmentsQuery = createQuery<
  GetAssigmentsRequestPayload,
  AssingmentResponse[]
>({
  handler: () => axios.get('IndividualSeal/Assignments'),
});
