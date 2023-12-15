import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { ActsCardContainerProps } from './actsCardContainer.types';
import { actsCardService } from './actsCardService.model';
import { ActsCard } from './view/ActsCard';

const { gates, inputs, outputs } = actsCardService;
const { ActsCardGate } = gates;

export const ActsCardContainer: FC<ActsCardContainerProps> = ({
  apartmentId,
}) => {
  const { acts, handleSaveFile } = useUnit({
    acts: outputs.$acts,
    handleSaveFile: inputs.saveFile,
  });

  return (
    <>
      <ActsCardGate apartmentId={Number(apartmentId)} />
      <ActsCard
        acts={acts}
        handleSaveFile={handleSaveFile}
        apartmentid={apartmentId}
      />
    </>
  );
};
