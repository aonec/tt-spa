import {
  $apartmentChecksDocuments,
  ApartmentChecksDocuments,
  fetchApartmentChecksDocumentsFx,
} from './index';
import { forward } from '../../../../../../node_modules/effector';
import { getApartmentCheckDocuments } from '01/_api/apartments';

fetchApartmentChecksDocumentsFx.use(getApartmentCheckDocuments)

$apartmentChecksDocuments.on(
  fetchApartmentChecksDocumentsFx.doneData,
  (_, documents) => documents
);

forward({
  from: ApartmentChecksDocuments.state.map(({ apartmentId }) => apartmentId),
  to: fetchApartmentChecksDocumentsFx,
});
