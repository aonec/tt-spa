import React, { FC } from 'react';
import { DescriptionBlock } from './RunnerGeneratingModal.styled';
import { Props } from './RunnerGeneratingModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import Loading from './assets/loadingModal.svg?react';

export const RunnerGeneratingModal: FC<Props> = ({ isOpen, setOpen }) => {
  const RunnerGeneratingForm = () => {
    return (
      <>
        <Loading />
        <DescriptionBlock>
          Загрузка может занять несколько минут. Можете закрыть окно и вернуться
          позже.
        </DescriptionBlock>
      </>
    );
  };

  return (
    <FormModal
      visible={isOpen}
      onCancel={() => setOpen(false)}
      title="Формирование бегунка"
      formId="Runner-Generating-Modal"
      form={<RunnerGeneratingForm />}
      customFooter={<></>}
    />
  );
};
