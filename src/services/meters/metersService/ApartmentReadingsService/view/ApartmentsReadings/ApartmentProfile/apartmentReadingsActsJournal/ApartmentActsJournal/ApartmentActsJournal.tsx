import React, { FC } from 'react';
import {
  SkeletonSC,
  ListWrapper,
  Wrapper,
  Header,
  Title,
  LinkButton,
} from './ApartmentActsJournal.styled';
import { Props } from './ApartmentActsJournal.types';
import { Empty, Skeleton } from 'antd';
import { DocumentIcon } from 'ui-kit/icons';
import { ApartmentActItem } from './ApartmentActItem';

export const ApartmentActsJournal: FC<Props> = ({
  apartmentActs,
  isLoading,
  apartmentId,
  handleSaveFile,
}) => {
  const acts = apartmentActs?.items || [];

  const loader = (
    <div>
      <Skeleton.Input size="small" />
      <ListWrapper>
        <SkeletonSC active />
        <SkeletonSC active />
        <SkeletonSC active />
      </ListWrapper>
    </div>
  );

  const content = (
    <>
      <Header>
        <Title>Журнал актов</Title>
        <LinkButton to={`/apartments/${apartmentId}/actsJournal`}>
          <DocumentIcon />
          Перейти в журнал актов
        </LinkButton>
      </Header>
      <ListWrapper>
        {acts.map((act) => (
          <ApartmentActItem
            handleSaveFile={handleSaveFile}
            act={act}
            key={act.id}
          />
        ))}
      </ListWrapper>
      {!acts.length && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет актов" />
      )}
    </>
  );

  return (
    <Wrapper>
      {!isLoading && content}
      {isLoading && loader}
    </Wrapper>
  );
};
