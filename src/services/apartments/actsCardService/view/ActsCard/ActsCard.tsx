import React, { FC, useMemo } from 'react';
import { ActCardItem } from './ActCardItem';
import {
  DocumentIconSC,
  MoreDocumentsLink,
  TitleWrapper,
  Wrapper,
} from './ActsCard.styled';
import { ActsCardProps } from './ActsCard.types';

export const ActsCard: FC<ActsCardProps> = ({
  acts,
  actTypes,
  handleSaveFile,
  apartmentid,
  housingStockId,
}) => {
  const cards = useMemo(
    () =>
      acts.map((act) => (
        <ActCardItem
          key={act.id}
          act={act}
          actTypes={actTypes}
          handleSaveFile={handleSaveFile}
        />
      )),
    [acts, actTypes]
  );

  return (
    <Wrapper>
      <TitleWrapper>Журнал актов</TitleWrapper>
      {cards}
      <MoreDocumentsLink
        to={`/objects/${housingStockId}/apartments/${apartmentid}/actsJournal`}
      >
        <DocumentIconSC />
        Показать все документы
      </MoreDocumentsLink>
    </Wrapper>
  );
};
