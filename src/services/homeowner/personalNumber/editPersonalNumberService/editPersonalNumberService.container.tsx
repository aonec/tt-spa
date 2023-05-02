import React from 'react';

export const EditPersonalNumberContainer = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const apartment = useStore(outputs.$apartment);
  const isLoading = useStore(outputs.$isLoading);

  const handleAddPersonalNumber = useEvent(inputs.handleAddPersonalNumber);

  useEffect(() => {
    return inputs.successAddPersonalNumber.watch(() => {
      history.push(`/meters/apartments/${apartment?.id}`);
    }).unsubscribe;
  }, [history, apartment?.id]);

  return (
    <>
      <ApartmentGate apartmentId={Number(id)} />

      <AddPersonalNumberPage
        apartment={apartment}
        isLoading={isLoading}
        handleAddPersonalNumber={handleAddPersonalNumber}
      />
    </>
  );
};
