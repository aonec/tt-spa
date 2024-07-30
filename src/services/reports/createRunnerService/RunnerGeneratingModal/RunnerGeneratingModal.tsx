import React, { FC, useState } from 'react';
import { Description, DescriptionBlock } from './RunnerGeneratingModal.styled';
import { Props } from './RunnerGeneratingModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import Loading from './assets/loadingModal.svg?react';
import { Loader } from 'ui-kit/Loader';

export const RunnerGeneratingModal: FC<Props> = ({ isOpen, setOpen }) => {
  const RunnerGeneratingForm = () => {
    return (
      <>
        <Loading />
        <DescriptionBlock>
          <Description>
            Загрузка может занять несколько минут
            <Loader show />
          </Description>
          <Description>
            Можете закрыть окно и вернуться после уведомления.
          </Description>
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
