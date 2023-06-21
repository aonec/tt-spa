import { axios } from '01/axios';
import { createQuery } from '@farfetched/core';

export const individualSealAssignmentsQuery = createQuery({
  handler: () => axios.get('IndividualSeal/Assignments'),
});
