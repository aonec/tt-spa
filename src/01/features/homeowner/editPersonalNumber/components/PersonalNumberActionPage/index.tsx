import { Loader } from '01/components';
import {
  $apartment,
  ApartmentGate,
} from '01/features/apartments/displayApartment/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Breadcrumb, ButtonTT } from '01/tt-components';
import { Title } from '01/_components/Headers';
import { useStore } from 'effector-react';
import { HousingStockListResponse } from 'myApi';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';

interface Props {
  title: string;
  onSaveHandler?(): void;
  loading?: boolean;
  type?: 'split';
}

export const PersonaNumberActionPage: React.FC<Props> = ({
  children,
  title,
  onSaveHandler,
  loading,
  type,
}) => {
  const apartment = useStore($apartment);

  const isSplit = type === 'split';

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const housingStock = apartment?.housingStock;

  const address = housingStock && getHousingStockAddressString(housingStock);

  return (
    <Wrap>
      <ApartmentGate id={Number(id)} />
      <Breadcrumb />
      <Title>{title}</Title>
      {address}
      <Space />
      {children}
      <Flex style={{ justifyContent: 'flex-end' }}>
        <ButtonTT color={'white'} key="back" onClick={history.goBack}>
          Отмена
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
            'Далее'
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

export const getHousingStockAddressString = (
  housingStock: HousingStockListResponse
) =>
  `${housingStock?.city} ул. ${housingStock?.street}, кв. ${
    housingStock?.number
  }${housingStock?.corpus || ''}`;
