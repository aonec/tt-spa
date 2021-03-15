import styled from 'styled-components'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

export const DatePickerTT = styled(DatePicker)`
    height: 48px;
    width: 100%;
    .ant-picker-range {
        height: 100% !important;
        padding: 8px 24px !important;

        span {
            font-size: 16px;
            line-height: 32px;
        }
    }
`

export default DatePicker
