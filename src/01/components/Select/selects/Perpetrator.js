/* eslint-disable */

import React from 'react';
import axios from '01/axios';

import { Select } from '../Select';
import { useStore } from 'effector-react';
import { $task } from '01/features/tasks/displayTask/models';

export const Perpetrator = ({ getData = () => {}, ...props }) => {
  const [data, setData] = React.useState({ loading: null });
  const task = useStore($task);

  React.useEffect(() => {
    data.loading &&
      axios
        .get('ManagingFirmUsers', {
          params: {
            RoleNames: task.stages.at(-1).requiredUserRoles.join(','),
          },
        })
        .then((data) => setData({ items: data.items }));
  }, [data, task]);

  return (
    <Select
      big
      placeholder="Выберите исполнителя"
      labelText="Исполнитель"
      list={data.items ?? []}
      loading={data.loading}
      onClick={() => !data.items && setData({ loading: true })}
      getSelectData={(id) => getData({ nextPerpetratorId: id[0] ?? null })}
      {...props}
    />
  );
};
