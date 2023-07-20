import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { CommentPanel } from 'ui-kit/shared/CommentPanel';
import { calculatorCommentService } from './calculatorCommentService.model';
import { CalculatorCommentContainerProps } from './calculatorCommentService.types';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';

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

  const isPermitionToChangeComment = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
  ]);

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
