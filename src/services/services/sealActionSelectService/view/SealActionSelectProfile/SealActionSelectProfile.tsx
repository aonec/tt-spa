import React, { FC } from 'react';
import {
  AppointmentsInfoWrapper,
  ChevronIconSC,
  GroupWrrapper,
  LinkBlock,
  SkeletonInputSC,
  TextWrapper,
  TitleWrapper,
  UserIconSC,
  Wrapper,
} from './SealActionSelectProfile.styled';
import { SealProfileProps } from './SealActionSelectProfile.types';
import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { PlusIcon } from 'ui-kit/icons';
import { SealActionType } from '../../../sealService/sealService.types';
import moment from 'moment';

export const SealActionSelectProfile: FC<SealProfileProps> = ({
  isNearestTotalAppointmentsLoading,
  nearestTotalAppointments,
}) => {
  const totalAppointmentsDate = moment(nearestTotalAppointments?.date).format(
    'DD MMMM',
  );

  return (
    <>
      <PageHeader title="Опломбировка" />
      <Wrapper>
        <LinkBlock to={`/services/seal/${SealActionType.Apartment}`}>
          <GroupWrrapper>
            <PlusIcon />
            <TitleWrapper>Создать запись на опломбировку</TitleWrapper>
          </GroupWrrapper>
          <ChevronIconSC />
        </LinkBlock>

        <LinkBlock to={`/services/seal/${SealActionType.Select}`}>
          <GroupWrrapper>
            <UserIconSC />
            <TitleWrapper>Распределить записи между контролерами</TitleWrapper>
          </GroupWrrapper>
          <AppointmentsInfoWrapper>
            {isNearestTotalAppointmentsLoading && <SkeletonInputSC active />}
            {!isNearestTotalAppointmentsLoading && nearestTotalAppointments && (
              <>
                <TextWrapper>{totalAppointmentsDate}:</TextWrapper>
                <TextWrapper>
                  {nearestTotalAppointments.distributed +
                    nearestTotalAppointments.notDistributed}
                  запись(-ей)
                </TextWrapper>
              </>
            )}
            <ChevronIconSC />
          </AppointmentsInfoWrapper>
        </LinkBlock>
      </Wrapper>
    </>
  );
};
