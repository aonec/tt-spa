/* eslint-disable */

import React from 'react';

import { Icon } from 'components';
export const UploadBtn = ({ styles, big, change }) => {
  return (
    <upload as="label" {...use({ big })}>
      Загрузить файл <Icon icon="upload" />
      <input type="file" multiple onChange={change} />
    </upload>
  );
};

UploadBtn.defaultProps = {
  styles: {},
};
