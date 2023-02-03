import { useEvent } from 'effector-react';
import React, { FC } from 'react';
import { CommentPanel } from 'ui-kit/shared_components/CommentPanel';
import { calculatorCommentService } from './calculatorCommentService.model';
import { CalculatorCommentContainerProps } from './calculatorCommentService.types';

const { inputs, gates } = calculatorCommentService;
const { CalculatorIdGate } = gates;

export const CalculatorCommentContainer: FC<CalculatorCommentContainerProps> = ({
  comment,
  calculatorId,
}) => {
  const { lastModifiedDateTime, lastModifiedUser } = comment || {};

  const handleRemoveComment = useEvent(inputs.removeComment);
  const handleCreateComment = useEvent(inputs.createComment);
  const handleEditComment = useEvent(inputs.editComment);

  const isCommentExist = Boolean(comment);

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
      />
    </>
  );
};
