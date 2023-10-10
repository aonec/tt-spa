import React, { FC, useMemo } from 'react';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import {
  InfoWrapper,
  LinkSC,
  RowWrapper,
  TaskBaseInfoWrapper,
  TitleWrapper,
} from './TaskBaseInfo.styled';
import { TaskBaseInfoProps } from './TaskBaseInfo.types';
import { EHouseCategory } from 'api/types';

export const TaskBaseInfo: FC<TaskBaseInfoProps> = ({ task }) => {
  const {
    id,
    address,
    creationTime,
    apartment,
    creationReason,
    perpetrator,
    houseCategory,
  } = task;

  const apartmentId = apartment?.id;
  const buildingId = task.buildingId;
  const apartmentComment = apartment?.comment || '';

  const buildingProfilePath = useMemo(() => {
    if (houseCategory === EHouseCategory.Living) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [houseCategory]);

  const linkPath = apartment
    ? `/apartments/${apartmentId}`
    : `/buildings/${buildingProfilePath}/${buildingId}`;

  const preparedCreationTime = creationTime
    ? getTimeStringByUTC(creationTime)
    : '-';

  return (
    <TaskBaseInfoWrapper>
      <TitleWrapper>Информация о задаче</TitleWrapper>
      <InfoWrapper>
        <RowWrapper>
          <div>Причина задачи</div>
          <div>{creationReason}</div>
        </RowWrapper>
        <RowWrapper>
          <div>Номер задачи</div>
          <div>{id}</div>
        </RowWrapper>
        <RowWrapper>
          <div>Дата создания</div>
          <div data-test="task-creation-time">{preparedCreationTime}</div>
        </RowWrapper>
        <RowWrapper>
          <div>Адрес</div>
          <LinkSC to={linkPath} target="_blank">
            {address}
          </LinkSC>
        </RowWrapper>
        {apartment && (
          <RowWrapper>
            <div>Комментарии к квартире</div>
            <div>{apartmentComment}</div>
          </RowWrapper>
        )}
        {perpetrator && (
          <RowWrapper>
            <div>Исполнитель</div>
            <div>{perpetrator.name}</div>
          </RowWrapper>
        )}
      </InfoWrapper>
    </TaskBaseInfoWrapper>
  );
};
