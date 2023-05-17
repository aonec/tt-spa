import React, { FC, useMemo, useState } from 'react';
import { ChoosePersonalNumberModalProps } from './ChoosePersonalNumberModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { CrownIcon, PencilBigIcon } from 'ui-kit/icons';
import { Footer, SelectSC, Title } from './ChoosePersonalNumberModal.styled';
import { Button } from 'ui-kit/Button';
import { useHistory } from 'react-router-dom';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService.types';

const formId = 'choose-personal-number-modal';

export const ChoosePersonalNumberModal: FC<ChoosePersonalNumberModalProps> = ({
  isOpen,
  apartment,
  setIsOpen,
  selectedAction,
  setSelectActionModalOpen,
}) => {
  const history = useHistory();

  const [homeownerId, setHomeownerId] = useState<string | null>(null);

  const redirectToPage = () => {
    if (selectedAction === PersonalNumberActions.Add) {
      history.push(
        `/apartment/${apartment.id}/homeowners/${PersonalNumberActions.Add}`,
      );
    } else {
      history.push(
        `/apartment/${apartment.id}/homeowners/${homeownerId}/${selectedAction}`,
      );
    }
  };

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
      customFooter={
        <Footer>
          <Button
            type="ghost"
            onClick={() => {
              setIsOpen(false);
              setHomeownerId(null);
              setSelectActionModalOpen(true);
            }}
          >
            Назад
          </Button>
          <Button
            disabled={!homeownerId}
            onClick={() => {
              redirectToPage();
              setIsOpen(false);
              setHomeownerId(null);
            }}
          >
            Далее
          </Button>
        </Footer>
      }
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
