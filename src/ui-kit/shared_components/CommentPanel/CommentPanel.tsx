import React, { FC } from 'react';
import { TrashIconSC } from 'ui-kit/DocumentsService/view/DocumentsLineUpload/DocumentsLineUpload.styled';
import { UserIcon } from 'ui-kit/icons';
import {
  CommentComponent,
  CommentDate,
  CommentHeader,
  CommentInfo,
  CommentText,
  CommentTitle,
  IconSubstrate,
  RightButtonsBlock,
  UserName,
} from './CommentPanel.styled';
import { PencilIconSC } from 'ui-kit/shared_components/SelectedEntityPanel/SelectedEntityPanel.styled';
import { CommentPanelProps } from './CommentPanel.types';

export const CommentPanel: FC<CommentPanelProps> = ({}) => {
  const text =
    ' Прибор иногда выходит из строя и сбиваются настройки соединения. Прошу коллег быть с ним более внимательными';
  const userName = 'Филиппов А.А.';
  const commentDate = '12.08.2019 10:36';

  return (
    <CommentComponent>
      <CommentHeader>
        <CommentTitle>Комментарий</CommentTitle>
        <RightButtonsBlock>
          <PencilIconSC />
          <TrashIconSC />
        </RightButtonsBlock>
      </CommentHeader>

      <CommentText>{text}</CommentText>

      <CommentInfo>
        <IconSubstrate>
          <UserIcon />
        </IconSubstrate>
        <UserName>{userName}</UserName>
        <CommentDate>{commentDate} </CommentDate>
      </CommentInfo>
    </CommentComponent>
  );
};
