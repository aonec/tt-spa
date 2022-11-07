/* eslint-disable */

import React from 'react';
import { TasksItem } from '01/components/items/TasksItem';
import { ObjectItem } from '01/components/items/ObjectItem';

export const List = ({ item = null, list = [], loading = false, ...props }) => {
  if (loading) return 'loading';

  let ItemList = React.Fragment;
  if (item === 'task') ItemList = TasksItem;
  if (item === 'object') ItemList = ObjectItem;

  return (
    <list as="ul" {...props}>
      {list.map((item) => (
        <ItemList key={item.id} {...item} />
      ))}
    </list>
  );
};
