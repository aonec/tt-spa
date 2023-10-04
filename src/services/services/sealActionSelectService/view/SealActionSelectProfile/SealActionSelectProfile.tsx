import React, { FC } from 'react';
import {
  AppointmentsInfoWrapper,
  SkeletonInputSC,
  TextWrapper,
  UserIconSC,
  Wrapper,
} from './SealActionSelectProfile.styled';
import { SealProfileProps } from './SealActionSelectProfile.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { CheckIcon, PlusIcon } from 'ui-kit/icons';
import { SealActionType } from '../../../sealService/sealService.types';
import dayjs from 'api/dayjs';
import { LinkPanel } from 'ui-kit/shared/LinkPanel';
import { getCountText } from 'utils/getCountText';
import { appointmentsText } from './SealActionSelectProfile.constants';

export const SealActionSelectProfile: FC<SealProfileProps> = ({
  isNearestTotalAppointmentsLoading,
  nearestTotalAppointments,
}) => {
  const totalAppointmentsDate = dayjs(nearestTotalAppointments?.date).format(
    'DD MMMM',
  );

  const totalCount =
    (nearestTotalAppointments?.distributed || 0) +
    (nearestTotalAppointments?.notDistributed || 0);

  return (
    <>
      <PageHeader title="Опломбировка" />
      <Wrapper>
        <LinkPanel
          link={`/services/seal/${SealActionType.Apartment}`}
          icon={<PlusIcon />}
          text="Создать запись на опломбировку"
        />

        <LinkPanel
          link={`/services/seal/${SealActionType.DistributeRecords}`}
          icon={<UserIconSC />}
          text="Распределить записи между контролерами"
          additionalInfo={
            <AppointmentsInfoWrapper>
              {isNearestTotalAppointmentsLoading && <SkeletonInputSC active />}
              {!isNearestTotalAppointmentsLoading &&
                nearestTotalAppointments && (
                  <>
                    <TextWrapper>{totalAppointmentsDate}:</TextWrapper>
                    <TextWrapper>
                      {nearestTotalAppointments.notDistributed} из {totalCount}{' '}
                      {getCountText(totalCount, appointmentsText)}
                    </TextWrapper>
                  </>
                )}
            </AppointmentsInfoWrapper>
          }
        />

        <LinkPanel
          link={`/services/seal/${SealActionType.AppointmentsJournal}`}
          icon={<CheckIcon />}
          text="Журнал распределенных записей"
        />
      </Wrapper>
    </>
  );
};
