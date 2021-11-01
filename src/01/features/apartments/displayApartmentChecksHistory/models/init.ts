import {
  $apartmentChecksDocuments,
  ApartmentChecksDocuments,
  fetchApartmentChecksDocumentsFx,
  refetchApartmentCheckHistory,
} from './index';
import { forward, sample } from '../../../../../../node_modules/effector';
import { getApartmentCheckDocuments } from '01/_api/apartments';

fetchApartmentChecksDocumentsFx.use(getApartmentCheckDocuments);

$apartmentChecksDocuments.on(
  fetchApartmentChecksDocumentsFx.doneData,
  (_, documents) => documents
);

forward({
  from: ApartmentChecksDocuments.state.map(({ apartmentId }) => apartmentId),
  to: fetchApartmentChecksDocumentsFx,
});

sample({
  clock: refetchApartmentCheckHistory,
  source: ApartmentChecksDocuments.state.map(({ apartmentId }) => apartmentId),
  target: fetchApartmentChecksDocumentsFx,
});
