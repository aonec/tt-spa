import React, { FC, useState } from 'react';
import { ButtonSc, TitleWrapper } from './ApplicationInfoBlock.styled';
import { ApplicationInfoBlockProps } from './ApplicationInfoBlock.types';
import { ApplicationBaseInfo } from './ApplicationBaseInfo';
import { BrigadeInfo } from './BrigadeInfo';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';

export const ApplicationInfoBlock: FC<ApplicationInfoBlockProps> = ({
  applicationInfo,
  address,
  addressLinkPath,
  isLoading,
  handleDelete,
  isDeleting,
}) => {
  const brigadeInfo = applicationInfo?.brigade || [];

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <TitleWrapper>Информация о задаче</TitleWrapper>
      <ApplicationBaseInfo
        applicationInfo={applicationInfo}
        address={address}
        addressLinkPath={addressLinkPath}
        isLoading={isLoading}
      />
      <BrigadeInfo brigadeInfo={brigadeInfo} />

      <ButtonSc type="danger" size="small" onClick={() => setOpen(true)}>
        Удалить заявку
      </ButtonSc>

      <Dialog
        isOpen={isOpen}
        onCancel={() => setOpen(false)}
        onSubmit={handleDelete}
        type="danger"
        description={'Вы уверены, что хотите удалить задачу?'}
        title="Удаление задачи"
        isLoading={isDeleting}
      />
    </>
  );
};
