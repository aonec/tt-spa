/* eslint-disable */

import React from 'react';

import { useSelectFetch } from '01/hooks/useSelectFetch';
import { Select } from '01/components/Select';
import { Upload } from '01/components/Upload';

export const Panel = React.memo(
  ({
    styles,
    showPanel,
    perpetrator,
    contractors,
    upload,
    pushButton,
    textarea,
    wrapper,
  }) => {
    if (!showPanel) return null;
    const { email, document } = wrapper;
    return (
      <wrapper>
        {email && perpetrator}
        {email && contractors}
        {email && (
          <>
            <textarea {...textarea} />
            <button data-big data-btn-tmp>
              <span>Выбрать шаблон</span>
            </button>
          </>
        )}
        {document && <Upload {...upload} />}

        <button data-primary data-big data-btn-push {...pushButton}>
          <span>Завершить этап</span>
        </button>
      </wrapper>
    );
  }
);
Panel.defaultProps = {
  styles: {},
};
