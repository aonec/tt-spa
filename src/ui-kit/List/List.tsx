import React, { FC } from 'react';
import { ListItemWrapper } from './List.styled';
import { ListProps } from './List.types';

export const List: FC<ListProps> = ({ children, gridTemp }) => {
  return (
    <>
      {children.map(({ key, nodes }) => (
        <ListItemWrapper gridTemp={gridTemp} key={key}>
          {nodes}
        </ListItemWrapper>
      ))}
    </>
  );
};
