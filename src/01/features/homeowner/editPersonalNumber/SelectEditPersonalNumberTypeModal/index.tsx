import React, { useState, useEffect } from 'react';
import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import {
  $isSelectEditPersonalNumberTypeModalOpen,
  closeEditPersonalNumberTypeModal,
} from '../models';
import styled from 'styled-components';
import { PlusIcon, EditIcon, SwitchIcon, ApartmentIcon } from '../icons';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { ReactComponent as MainIcon } from './icons/main.svg';
import { useHistory, useParams } from 'react-router';

export const SelectEditPersonalNumberTypeModal: React.FC = () => {
  const isOpen = useStore($isSelectEditPersonalNumberTypeModalOpen);

  const [selectedType, setSelectedType] = useState<SelectItem | null>(null);
  const [homeownerId, setHomeownerId] = useState<number | null>(null);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const apartment = useStore($apartment);

  const selects: SelectItem[] = [
    {
      title: 'Редактировать лицевой счет',
      icon: EditIcon,
      route: 'editPersonalNumber',
    },
    {
      title: 'Заменить лицевой счет',
      icon: SwitchIcon,
      route: 'switchPersonalNumberFx',
    },
    {
      title: 'Добавить новый лицевой счет к этой квартире',
      icon: PlusIcon,
      route: 'addPersonalNumber',
    },
    {
      title: 'Разделить лицевые счета и создать новую квартиру',
      icon: ApartmentIcon,
      route: 'splitApartment',
    },
  ];

  useEffect(() => {
    setHomeownerId(
      () =>
        Number(
          apartment?.homeownerAccounts?.find(
            (elem) => elem.isMainPersonalAccountNumber
          )?.id
        ) ||
        Number(
          apartment?.homeownerAccounts && apartment?.homeownerAccounts[0]?.id
        ) ||
        null
    );
  }, [selectedType, apartment]);

  const renderSelectItem = (selectItem: SelectItem) => {
    const { title, icon: Icon } = selectItem;
    return (
      <StyledSelectItem
        onClick={() => setSelectedType(selectItem)}
        key={selectItem.title}
      >
        <Icon />
        <Space />
        <StyledSelectItemTitle>{title}</StyledSelectItemTitle>
      </StyledSelectItem>
    );
  };

  useEffect(() => {
    if (selectedType?.route === 'addPersonalNumber') {
      history.push(`/apartment/${id}/homeowners/${selectedType?.route}`);
      closeEditPersonalNumberTypeModal();
    }
  }, [selectedType]);

  const SelectedTypeIcon = selectedType?.icon || (() => <></>);

  const selectedHomeowner = apartment?.homeownerAccounts?.find(
    (elem) => Number(elem.id) === homeownerId
  );

  const selectHomeownerAccount = (
    <StyledSelect
      placeholder="Выберите лицевой счет"
      style={{ width: '100%' }}
      value={homeownerId || void 0}
      onChange={setHomeownerId as any}
    >
      {apartment?.homeownerAccounts?.map((elem) => (
        <StyledSelect.Option value={elem.id!} key={elem.id}>
          {selectedHomeowner?.isMainPersonalAccountNumber && <MainIcon />}
          {elem.personalAccountNumber} ({elem?.name?.replaceAll('unknown', '')})
        </StyledSelect.Option>
      ))}
    </StyledSelect>
  );

  return (
    <ModalTT
      customCancelButton={() => setSelectedType(null)}
      visible={isOpen}
      title={
        <Flex>
          {selectedType && (
            <>
              <SelectedTypeIcon />
              <Space />
            </>
          )}
          {selectedType ? 'Выберите лицевой счет' : 'Выберите действие'}
        </Flex>
      }
      footer={selectedType ? undefined : <></>}
      saveBtnText="Далее"
      onCancel={closeEditPersonalNumberTypeModal}
      onSubmit={() => {
        closeEditPersonalNumberTypeModal();
        history.push(
          `/apartment/${id}/homeowners/${homeownerId}/${selectedType?.route}`
        );
      }}
      disabled={Boolean(selectedType && !homeownerId)}
    >
      {selectedType ? selectHomeownerAccount : selects.map(renderSelectItem)}
    </ModalTT>
  );
};

interface SelectItem {
  title: string;
  icon: React.FC;
  action?(): void;
  route?: string;
}

const StyledSelectItem = styled.div`
  border: 1px solid rgba(220, 222, 228, 1);
  border-radius: 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  padding: 14px 18px;

  transition: 0.2s;

  &:hover {
    border: 1px solid rgba(24, 158, 233, 1);
    box-shadow: 0 4px 8px rgba(24, 158, 233, 0.32);
  }

  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledSelectItemTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  color: rgba(39, 47, 90, 0.9);
`;
