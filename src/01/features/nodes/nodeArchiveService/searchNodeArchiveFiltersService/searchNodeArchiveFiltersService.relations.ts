import { forward } from 'effector';
import { searchNodeArchiveFilters } from './searchNodeArchiveFiltersService.models';

forward({
  from: searchNodeArchiveFilters.form.formValidated.map((values) => ({
    from: values.from?.toISOString(),
    to: values.to?.toISOString(),
  })),
  to: searchNodeArchiveFilters.inputs.loadNodeArchiveData,
});
