import styled, { css } from 'styled-components';
import { Select } from "antd";

export const SelectTT = styled(Select)`
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
  ${({ size }) => (size == '32'
  && css`
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
 
      `)
  || (size == 'grey'
    && css`
       color: rgba(39, 47, 90, 0.6);
      `)};
      
`;

export default SelectTT;

// .ant-picker {
//  width: 100%;
//  height: 48px;
//  padding: 8px 24px !important;
// }
//
// .ant-picker-range {
//  border: 1px solid #dcdee4;
//  box-sizing: border-box;
//  border-radius: 4px;
//  height: 48px;
//  width: 408px;
//  padding: 8px 24px;
//
//  input {
//    font-size: 16px;
//    line-height: 32px;
//    color: rgba(39, 47, 90, 0.8);
//  }
// }
//
// .ant-picker-range-separator {
//  padding: 0 24px;
// }
//
// .ant-select {
//  height: 48px;
//
//  .ant-select-selector {
//    height: 100% !important;
//    padding: 8px 24px !important;
//
//    span {
//      font-size: 16px;
//      line-height: 32px;
//    }
//  }
//
//  .ant-select-arrow {
//    padding: 0 28px !important;
//  }
// }
//
// .ant-radio-group {
//  height: 48px;
//
//  label {
//    height: 48px;
//  }
//
//  span {
//    line-height: 48px;
//  }
// }
//
//
// .ant-upload.ant-upload-drag {
//  border: 1px dashed #DCDEE4;
//  box-sizing: border-box;
//  background: none;
//  height: 104px;
//  margin-top: 16px;
// }
//
// .ant-form-item {
//  display: flex !important;
//  flex-direction: column !important;
//  align-items: baseline !important;
//
//  .ant-form-item-control {
//    width: 100%;
//
//    .ant-input {
//      color: rgba(39, 47, 90, 0.8);
//      // border: 1px solid #dcdee4;
//      box-sizing: border-box;
//      border-radius: 4px;
//      width: 100%;
//      height: 48px;
//      padding: 8px 24px;
//      font-size: 16px;
//      line-height: 32px;
//    }
//  }
// }
