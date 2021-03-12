import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import styled, { css, use } from 'reshadow/macro'

export const StyledTextArea = ({ labelText, ...props }) =>
    styled()`
        div {
            grid-area: ta;
        }
    `(
        <div>
            <label
                style={{
                    fontSize: '14px',
                    lineHeight: '16px',
                    fontWeight: '500',
                }}
            >
                {labelText}
            </label>
            <TextArea data-big data-primary {...props} />
        </div>
    )

export default StyledTextArea
