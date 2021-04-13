import React from 'react';
import TextArea from 'antd/es/input/TextArea';

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
