import { Loader } from '01/components';
import {
  $apartment,
  ApartmentGate,
} from '01/features/apartments/displayApartment/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Title } from '01/_components/Headers';
import { useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { useForm } from 'effector-forms/dist';
import { personalNumberEditForm } from '../../models';
import { Button } from 'ui-kit/Button';

interface Props {
  title: string;
  onSaveHandler?(): void;
  onCancelHandler?(): void;
  loading?: boolean;
  type?: 'split';
  saveButtonText?: string;
  cancelButtonText?: string;
}

export const PersonaNumberActionPage: React.FC<Props> = ({
  children,
  title,
  onSaveHandler,
  onCancelHandler,
  loading,
  type,
  saveButtonText,
  cancelButtonText,
}) => {
  const apartment = useStore($apartment);

  const { submit } = useForm(personalNumberEditForm);

  const isSplit = type === 'split';

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const address = apartment && getApartmentAddressString(apartment);

  return (
    <Wrap>
      <ApartmentGate id={Number(id)} />
      <GoBack />
      <Title>{title}</Title>
      {address}
      <Space />
      {children}
      <Flex style={{ justifyContent: 'flex-end' }}>
        <Button
          type="ghost"
          key="back"
          onClick={onCancelHandler || history.goBack}
        >
          {cancelButtonText || 'Отмена'}
        </Button>
        <Space />
        <Button disabled={loading} onClick={onSaveHandler || (() => submit())}>
          {loading ? (
            <Loader show />
          ) : isSplit ? (
            saveButtonText || 'Далее'
          ) : (
            'Сохранить изменения'
          )}
        </Button>
      </Flex>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 620px;
`;
