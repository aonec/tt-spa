import React from 'react';
import { useParams } from 'react-router-dom';

export const ApartmentsListContainer = () => {
  const { id } = useParams<{ id: string }>();

  return <>apartments list {id}</>;
};
