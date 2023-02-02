import styled from 'styled-components';
import { Select } from 'ui-kit/Select';

export const Wrapper = styled.div``;

export const Margin = styled.div`
  margin: 12px 0px 16px 0px;
`;

export const ErrorBlockGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 10px;

  border-bottom: 1px solid #dcdee4;
  margin-bottom: 8px;
  padding-bottom: 16px;
`;

export const RangeBlockGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 10px;
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr 1fr;

  margin-top: 16px;
  align-items: center;
`;

export const ErrorFieldName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: #272f5a;
`;

export const Value = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

export const RangeFieldName = styled.div`
  display: flex;
  align-items: center;
`;

export const Symbol = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: #272f5a;
`;

export const FieldName = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);

  margin-left: 8px;
`;

export const LoaderWrapper = styled.div`
  max-width: 700px;
`;

export const ResourceSelectWrapper = styled.div`
  padding: 0px 10px 0px 10px;
  width: 260px;

  .ant-select {
    width: 100%;
  }
`;
export const FilterBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .ant-select {
    width: 100%;
  }
`;

export const SelectWide = styled(Select)`
  min-width: 300px;
  max-width: 550px;
`;
