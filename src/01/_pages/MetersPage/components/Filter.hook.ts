import { GetApartmentRequestPayload } from './Filter.types';
import { useHistory } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { getApartment } from './Filter.api';

export function useFilters() {
  const history = useHistory();

  const [searchState, setSearchState] = useState<GetApartmentRequestPayload>(
    {}
  );

  const syncSearchState = useCallback(
    (values: GetApartmentRequestPayload) =>
      setSearchState((prev) => ({ ...prev, ...values })),
    []
  );

  const handleSubmit = useCallback(async () => {
    const {
      city,
      street,
      house,
      apartment: apartmentNumber,
      question,
    } = searchState;

    if (!question && (!city || !street || !house || !apartmentNumber)) return;

    const apartment = await getApartment(searchState);

    if (!apartment) {
      setSearchState({});

      return history.push('/meters/apartments/');
    }

    if (apartment.homeownerName) {
      syncSearchState({
        question: apartment.homeownerName,
      });
    }

    history.push(`/meters/apartments/${apartment.id}`);
  }, [history, searchState]);

  useEffect(() => {
    handleSubmit();
  }, [searchState]);

  return { syncSearchState, searchState };
}
