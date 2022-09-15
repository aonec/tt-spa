import { ApartmentActTypesGate } from '01/features/actsJournal/displayActTypes/models';
import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { ActsCardContainerProps } from './actsCardContainer.types';
import { actsCardService } from './actsCardService.model';
import { ActsCard } from './view/ActsCard';

const { gates, inputs, outputs } = actsCardService;
const { ActsCardGate } = gates;

export const ActsCardContainer: FC<ActsCardContainerProps> = ({
  apartmentId,
  housingStockId,
}) => {
  const acts = useStore(outputs.$acts);
  const actTypes = useStore(outputs.$actTypes);

  const handleSaveFile = useEvent(inputs.saveFile);

  return (
    <>
      <ActsCardGate apartmentId={Number(apartmentId)} />
      <ApartmentActTypesGate />
      <ActsCard
        acts={acts}
        actTypes={actTypes || []}
        handleSaveFile={handleSaveFile}
        apartmentid={apartmentId}
        housingStockId={housingStockId}
      />
    </>
  );
};
