import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import styled, { css, use } from 'reshadow/macro';

export const StyledTextArea = ({ labelText, ...props }) =>
  styled()`
    div {
      grid-area: ta;
    }
  `(
    <div>
      <label
        style={{
          fontSize: '16px',
          lineHeight: '16px',
          fontWeight: '500',
          color: 'var(--main-60)',
          display: 'inlineBlock',
        }}
      >
        {labelText}
      </label>
      <TextArea data-big data-primary {...props} style={{ marginTop: 8 }} />
    </div>
  );

export default StyledTextArea;
