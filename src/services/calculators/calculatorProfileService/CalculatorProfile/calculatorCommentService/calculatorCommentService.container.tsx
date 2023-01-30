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
  const handleRemoveComment = useEvent(inputs.removeComment);

  return (
    <>
      <CalculatorIdGate calculatorId={calculatorId} />
      <CommentPanel
        comment={comment}
        author=""
        commentDate=""
        onEdit={console.log}
        onRemove={() => handleRemoveComment()}

      />
    </>
  );
};
