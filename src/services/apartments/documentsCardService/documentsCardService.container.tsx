import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { documentsCardService } from './documentsCardService.model';
import { DocumentsCardContainerProps } from './DocumentsCardService.types';
import { DocumentsCard } from './view/DocumentsCard';

const { outputs, inputs, gates } = documentsCardService;

export const DocumentsCardContainer: FC<DocumentsCardContainerProps> = ({
  apartmentId,
  housingStockId,
}) => {
  const lastDocuments = useStore(outputs.$lastDocuments);

  const handleSaveFile = useEvent(inputs.saveDocument);

  const { ApartmentIdGate } = gates;

  return (
    <>
      <ApartmentIdGate apartmentId={Number(apartmentId)} />
      <DocumentsCard
        apartmentid={apartmentId}
        housingStockId={housingStockId}
        lastDocuments={lastDocuments}
        handleSaveFile={handleSaveFile}
      />
    </>
  );
};
