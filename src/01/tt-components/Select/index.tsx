import styled, { css } from 'styled-components'
import { Select } from 'antd'

interface Props {
    name?: string
    size?: any
    isConnected?: any
}


export const SelectTT = styled(Select)<Props>`
    height: 48px;
     {
        .ant-select-selector {
            height: 100% !important;
            padding: 8px 24px !important;
            span {
                font-size: 16px;
                line-height: 32px;
            }
        }
        .ant-select-arrow {
            padding: 0 28px !important;
        }
    }
    ${({ size }) =>
        (size === '32' &&
            css`
     height: 32px;
      {
 .ant-select-selector {
   height: 100% !important;
   padding: 4px 24px !important;
   span {
     font-size: 16px;
     line-height: 24px;
   }
 }
 .ant-select-arrow {
   padding: 0 28px !important;
 }
 
      `) ||
        (size == 'grey' &&
            css`
                color: rgba(39, 47, 90, 0.6);
            `)};
`

export default SelectTT
