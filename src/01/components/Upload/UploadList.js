/* eslint-disable */

import React from 'react';
import styled, { css, use } from '@reshadow/macro';
import { Icon } from '../Icon';
import { Loader } from '../Loader';

const styles = css`
  upload_list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    opacity: 0.8;
  }

  file_wrapper {
    display: inline-grid;
    grid-template-columns: auto auto;
    grid-gap: 8px;
    margin-right: 16px;
    &[|deleted] {
      cursor: not-allowed;
      & > * {
        pointer-events: none;
      }
    }
  }

  file {
    &:hover {
      color: var(--primary-100);
    }
  }

  Icon {
    cursor: pointer;
    &:hover {
      color: var(--error);
    }
  }
`;

export const UploadList = ({ items = [], del = () => {}, ...props }) => {
  return styled(styles)(
    <upload_list {...props}>
      {items.map(({ url, name, id, deleted = false }) => (
        <file_wrapper key={id} {...use({ deleted })}>
          <file as="a" href={url} target="_blank" rel="noreferrer noopener">
            {name}
          </file>
          <Loader show={deleted}>
            <Icon icon="del" onClick={del(id)} />
          </Loader>
        </file_wrapper>
      ))}
    </upload_list>
  );
};
