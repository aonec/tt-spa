import styled from 'styled-components';
import { AutoComplete, Form } from 'antd';

export const Wrapper = styled.div``;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.div`
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
  color: #272f5ab2;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1.5fr;
  grid-gap: 45px;
`;

export const PageTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  margin-bottom: 10px;
`;
export const BlockTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  user-select: none;
`;

export const ErrorMessage = styled.div`
  color: red;
`;

export const FormItem = styled(Form.Item)`
  width: 100%;
`;

export const StyledAutoComplete = styled(AutoComplete)`
  .ant-select-selector {
    border-radius: 4px !important;
    height: 48px !important;
    padding: 4px 24px !important;

    input {
      padding: 6px 12px 0 12px !important;
    }
  }
`;
