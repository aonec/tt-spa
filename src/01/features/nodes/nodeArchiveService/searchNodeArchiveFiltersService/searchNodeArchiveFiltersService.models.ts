import { createDomain } from 'effector';
import { createForm } from 'effector-forms';

const searchNodeArchiveFiltersServiceDomain = createDomain(
  'searchNodeArchiveFiltersService'
);

const form = createForm({
  fields: {
    from: {
      init: null as moment.Moment | null,
    },
    to: {
      init: null as moment.Moment | null,
    },
  },
});

export const searchNodeArchiveFilters = {
  form,
};
