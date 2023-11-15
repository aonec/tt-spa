import React, { FC, useState } from 'react';
import { PostponeModalProps } from './PostponeModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { TextareaSC } from './PostponeModal.styled';

const formId = 'postpone-task';

export const PostponeModal: FC<PostponeModalProps> = ({
  isPostponeModalOpen,
  setModalOpen,
  handlePostpone,
}) => {
  const [comment, setCommet] = useState<string>('');

  return (
    <FormModal
      title="Отложить задачу"
      submitBtnText="Отложить задачу"
      visible={isPostponeModalOpen}
      onCancel={() => setModalOpen(false)}
      form={
        <Form id={formId} onSubmitCapture={() => handlePostpone(comment)}>
          <FormItem label="Комментарий">
            <TextareaSC
              rows={4}
              placeholder="Опишите причину, по которой вы хотите отложить задачу"
              value={comment}
              onChange={(value) => setCommet(value.target.value)}
            />
          </FormItem>
        </Form>
      }
      formId={formId}
    />
  );
};
