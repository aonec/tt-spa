import { Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

export const StyledTextArea = ({ labelText, ...props }) => (
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
