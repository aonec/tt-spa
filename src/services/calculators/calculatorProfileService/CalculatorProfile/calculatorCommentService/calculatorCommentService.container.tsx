import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { CommentPanel } from 'ui-kit/shared_components/CommentPanel';
import { calculatorCommentService } from './calculatorCommentService.model';
import { CalculatorCommentContainerProps } from './calculatorCommentService.types';
import { currentUserService } from 'services/currentUserService';
import _ from 'lodash';
import { ESecuredIdentityRoleName } from 'myApi';

const { outputs, inputs, gates } = calculatorCommentService;
const { CalculatorIdGate } = gates;

export const CalculatorCommentContainer: FC<
  CalculatorCommentContainerProps
> = ({ comment, calculatorId }) => {
  const lastModifiedDateTimeFromCalculatorData = comment?.lastModifiedDateTime;
  const lastModifiedUserFromCalculatorData = comment?.lastModifiedUser;

  const handleRemoveComment = useEvent(inputs.removeComment);
  const handleCreateComment = useEvent(inputs.createComment);
  const handleEditComment = useEvent(inputs.editComment);

  const commentResponseData = useStore(outputs.$commentResponseData);

  const isCommentExist = Boolean(comment);

  const lastModifiedDateTime =
    commentResponseData?.lastModifiedDateTime ||
    lastModifiedDateTimeFromCalculatorData;

  const lastModifiedUser =
    commentResponseData?.lastModifiedUser || lastModifiedUserFromCalculatorData;

  const userRoles = useStore(currentUserService.outputs.$currentUserRoles);
  const userRolesKeys = userRoles.map((e) => e.key);
  const isPermitionToChangeComment = Boolean(
    _.intersection(userRolesKeys, [
      ESecuredIdentityRoleName.Administrator,
      ESecuredIdentityRoleName.ManagingFirmExecutor,
    ]).length,
  );

  return (
    <>
      <CalculatorIdGate calculatorId={calculatorId} />
      <CommentPanel
        oldCommentText={comment ? comment?.text : null}
        author={
          lastModifiedUser
            ? `${lastModifiedUser?.lastName} ${lastModifiedUser?.firstName}`
            : undefined
        }
        commentDate={lastModifiedDateTime}
        onEdit={(text) => {
          if (isCommentExist) {
            return handleEditComment(text);
          }
          return handleCreateComment(text);
        }}
        onRemove={() => handleRemoveComment()}
        isHavePermission={isPermitionToChangeComment}
      />
    </>
  );
};
