/* eslint-disable */

import React from 'react';
import { useHistory } from 'react-router-dom';

export const Information = ({ list = [], loading = true, ...props }) => {
  const { push } = useHistory();
  return (
    <information {...props}>
      <h2>Общая информация</h2>
      {/* <Loader show={loading} size="32"> */}
      <info_list>
        {list.map(({ title, value, url }) => (
          <info_item
            key={title}
            {...use({ url })}
            onClick={url ? push(url) : null}
          >
            <span>{title}</span>
            <span>{value}</span>
          </info_item>
        ))}
      </info_list>
      {/* </Loader> */}
    </information>
  );
};
