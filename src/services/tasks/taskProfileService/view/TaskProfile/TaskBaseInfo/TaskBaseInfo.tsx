import React, { FC, useMemo } from 'react';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import {
  Address,
  InfoWrapper,
  RowWrapper,
  TaskBaseInfoWrapper,
  TitleWrapper,
} from './TaskBaseInfo.styled';
import { TaskBaseInfoProps } from './TaskBaseInfo.types';
import { EHouseCategory } from 'api/types';
import { useNavigate } from 'react-router-dom';

export const TaskBaseInfo: FC<TaskBaseInfoProps> = ({ task }) => {
  const {
    id,
    address,
    creationTime,
    apartment,
    creationReason,
    perpetrator,
    houseCategory,
    firstTrigger,
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

  const preparedFirstTrigger = firstTrigger
    ? getTimeStringByUTC(firstTrigger)
    : '-';

  const navigate = useNavigate();

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
          <div>Первый повод</div>
          <div>{preparedFirstTrigger}</div>
        </RowWrapper>
        <RowWrapper>
          <div>Адрес</div>
          <Address onClick={() => navigate(linkPath)}>{address}</Address>
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
