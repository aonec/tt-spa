import React from 'react';
import styled from 'styled-components';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { Loader as TTLoader } from '01/components';
import { ApartmentListResponse } from '../../../../myApi';

const Loader = styled(TTLoader)`
  margin-top: 10px;
`;

const Apart = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr) repeat(2, 0.5fr);
  align-items: center;
  height: 48px;
  padding: 8px;
  cursor: pointer;
  &:hover {
    color: var(--primary-100);
    box-shadow: var(--shadow);
  }
`;

const ApartOwner = styled.div`
  opacity: 0.8;
`;

const ApartInfo = styled.div`
  opacity: 0.6;
`;

interface ApartmentsProps {
  loading: boolean | null;
  items:
    | (ApartmentListResponse & {
        title: string;
        owner: string | null;
        number: string | null;
      })[]
    | null;
}

export const Apartments = ({ loading = null, items = [] }: ApartmentsProps) => {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  if (loading) return <Loader show size="32" />;

  if (items?.length === 1)
    return <Redirect to={`/meters/apartments/${items[0].id}`} />;

  return items?.map(({ title, id, owner, number, square }) => (
    <Apart key={id} onClick={() => push(`${url}/${id}`)}>
      <h4>{title}</h4>
      <ApartOwner>{owner}</ApartOwner>
      <ApartInfo>{number}</ApartInfo>
      <ApartInfo>
        {square ?? '-'} м<sup>2</sup>
      </ApartInfo>
    </Apart>
  ));
};
