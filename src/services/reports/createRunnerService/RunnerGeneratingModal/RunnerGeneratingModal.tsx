import React, { FC } from 'react';
import { Description } from './RunnerGeneratingModal.styled';
import { Props } from './RunnerGeneratingModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import Loading from './assets/loadingModal.svg?react';

export const RunnerGeneratingModal: FC<Props> = ({}) => {
  const RunnerGeneratingForm = () => {
    return (
      <>
        <Loading />
        <Description>Загрузка может занять несколько минут</Description>
        <Description>Можете закрыть окно и вернуться позже</Description>
      </>
    );
  };

  return (
    <FormModal
      visible={true}
      title="Формирование бегунка"
      formId="Runner-Generating-Modal"
      form={<RunnerGeneratingForm />}
      customFooter={<></>}
    />
  );
};
