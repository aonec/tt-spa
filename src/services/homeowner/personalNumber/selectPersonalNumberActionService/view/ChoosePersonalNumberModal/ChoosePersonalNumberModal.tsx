import React, { FC, useMemo, useState } from 'react';
import { ChoosePersonalNumberModalProps } from './ChoosePersonalNumberModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { CrownIcon, PencilBigIcon } from 'ui-kit/icons';
import { SelectSC, Title } from './ChoosePersonalNumberModal.styled';

const formId = 'choose-personal-number-modal';

export const ChoosePersonalNumberModal: FC<ChoosePersonalNumberModalProps> = ({
  isOpen,
  apartment,
}) => {
  const [homeownerId, setHomeownerId] = useState<string | null>(null);

  const activeHomeownerAccounts = useMemo(
    () =>
      apartment?.homeownerAccounts?.filter((account) => !account.closedAt) ||
      [],
    [apartment],
  );

  return (
    <FormModal
      title={
        <Title>
          <PencilBigIcon /> <div>Выберите лицевой счет</div>
        </Title>
      }
      formId={formId}
      visible={isOpen}
      submitBtnText="Далее"
      form={
        <SelectSC
          placeholder="Выберите лицевой счет"
          value={homeownerId || void 0}
          onChange={(value) => setHomeownerId(value as string)}
        >
          {activeHomeownerAccounts.map((account) => (
            <SelectSC.Option value={account.id} key={account.id}>
              {account.isMainPersonalAccountNumber && <CrownIcon />}{' '}
              {account.personalAccountNumber} (
              {account?.name?.replaceAll('unknown', '')})
            </SelectSC.Option>
          ))}
        </SelectSC>
      }
    />
  );
};
