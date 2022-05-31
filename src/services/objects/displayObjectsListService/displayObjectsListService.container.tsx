import React from 'react';
import { ObjectsList } from './view/ObjectsList';
import { SearchObjects } from './view/SearchObjects';

export const ObjectsListContainer = () => {
  return (
    <>
      <SearchObjects />
      <ObjectsList />
    </>
  );
};
