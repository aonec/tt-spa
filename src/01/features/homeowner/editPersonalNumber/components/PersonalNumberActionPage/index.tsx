import { Loader } from '01/components';
import {
  $apartment,
  ApartmentGate,
} from '01/features/apartments/displayApartment/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ButtonTT } from '01/tt-components';
import { Title } from '01/_components/Headers';
import { useStore } from 'effector-react';
import { ApartmentResponse, HousingStockListResponse } from 'myApi';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { GoBack } from 'ui-kit/shared_components/GoBack';

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
        <ButtonTT
          color={'white'}
          key="back"
          onClick={onCancelHandler || history.goBack}
        >
          {cancelButtonText || 'Отмена'}
        </ButtonTT>
        <Space />
        <ButtonTT
          color="blue"
          key="submit"
          disabled={loading}
          onClick={onSaveHandler}
        >
          {loading ? (
            <Loader show />
          ) : isSplit ? (
            saveButtonText || 'Далее'
          ) : (
            'Сохранить изменения'
          )}
        </ButtonTT>
      </Flex>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 620px;
`;
