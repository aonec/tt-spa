import React, { FC } from 'react';
import {
  ChevronIconSC,
  GroupWrrapper,
  ReportBlock,
  TextWrapper,
  Wrapper,
} from './SealActionSelectProfile.styled';
import { SealProfileProps } from './SealActionSelectProfile.types';
import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { PlusIcon } from 'ui-kit/icons';
import { SealActionType } from '../../sealService.types';

export const SealActionSelectProfile: FC<SealProfileProps> = () => {
  return (
    <>
      <PageHeader title="Опломбировка" />
      <Wrapper>
        <ReportBlock to={`/services/seal/${SealActionType.Apartment}`}>
          <GroupWrrapper>
            <PlusIcon />
            <TextWrapper>Создать запись на опломбировку</TextWrapper>
          </GroupWrrapper>
          <ChevronIconSC />
        </ReportBlock>
      </Wrapper>
    </>
  );
};
