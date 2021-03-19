import styled, {css} from 'styled-components'
import {Select} from 'antd'

interface Props {
    name?: string
    size?: any
    isConnected?: any
}

export const MultiSelectTT = styled(Select)<Props>`
  .ant-select-selector {
    height: 48px;
    padding: 8px 24px;
  }

  .ant-select-selection-placeholder {
    left: 0;
    right: 0;
    padding: 8px 24px;
  }
`
export default MultiSelectTT