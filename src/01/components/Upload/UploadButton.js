/* eslint-disable */

import React from 'react';
import styled, { css } from 'reshadow/macro';
import { Loader, Icon } from '01/components';

const styles = css`
  upload {
    border: 1px solid var(--frame);
    border-radius: 4px;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 16px;
    place-self: start;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    &:hover {
      color: var(--primary-100);
      border-color: inherit;
    }
  }
`;

export const UploadButton = ({
  loading = false,
  text = 'Загрузить',
  onChange,
  ...props
}) => {
  const onChangeHandler = (e) => {
    onChange(e.target.files[0]);
    e.target.value = null;
  };

  return styled(styles)(
    <upload as="label" {...props}>
      {text}
      <Loader show={loading}>
        <Icon icon="upload" />
      </Loader>
      <input type="file" onChange={onChangeHandler} disabled={loading} />
    </upload>
  );
};

