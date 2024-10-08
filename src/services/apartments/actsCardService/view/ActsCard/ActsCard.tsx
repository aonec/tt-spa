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
  handleSaveFile,
  apartmentid,
}) => {
  const cards = useMemo(
    () =>
      acts.map((act) => (
        <ActCardItem key={act.id} act={act} handleSaveFile={handleSaveFile} />
      )),
    [acts, handleSaveFile],
  );

  return (
    <Wrapper>
      <TitleWrapper>Журнал актов</TitleWrapper>
      {cards}
      <MoreDocumentsLink to={`/apartments/${apartmentid}/actsJournal`}>
        <DocumentIconSC />
        Показать все акты
      </MoreDocumentsLink>
    </Wrapper>
  );
};
