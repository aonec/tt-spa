import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const StyledTextArea = ({ labelText, ...props }) => (
  <div style={{ gridArea: 'ta' }}>
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
