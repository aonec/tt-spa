/* eslint-disable */

import React from 'react';

import { Icon } from 'components';

export const UploadList = ({
  styles,
  list = [],
  files = null,
  loading = false,
  click = () => {},
}) => {
  return (
    <ul>
      {files &&
        Object.values(files).map(({ name }) => (
          <li key={name}>
            <span>{name}</span>
            <load as="Icon" icon="replacement" />
          </li>
        ))}
      {list.map(({ name, url, id }) => (
        <li key={id} id={id}>
          <a href={url} target="_blank" rel="noreferrer noopener">
            {name}
          </a>
          {!loading ? (
            <button onClick={() => click(id)}>
              <Icon icon="close" />
            </button>
          ) : (
            <load as="Icon" icon="replacement" />
          )}
        </li>
      ))}
    </ul>
  );
};

UploadList.defaultProps = {
  styles: {},
};
