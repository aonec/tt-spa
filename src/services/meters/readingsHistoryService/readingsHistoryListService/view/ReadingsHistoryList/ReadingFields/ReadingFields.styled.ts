import styled from 'styled-components';
import { RequestStatusShared } from '../../../readingsHistoryListService.types';

export const Prefix = styled.span`
  color: lightgray;
  margin-right: 8px;
`;

export const Suffix = styled.div`
  display: flex;
  color: black;
  white-space: nowrap;
`;

export const FieldsWrap = styled.div`
  margin-right: 20px;
  counter-reset: section;

  ${({ removed }: { removed?: boolean }) => (removed ? 'color: red;' : '')}
`;

export const ValueLine = styled.div`
  display: flex;
  align-items: center;
  height: 30px;

  ${(props: { isReading?: boolean }) =>
    props.isReading
      ? `
    &:before {
      counter-increment: section;
      content: 'T' counter(section) ' ';
      color: lightgray;
      margin-right: 10px;
    }
  padding-left: 12px;
    `
      : ''}
`;

export const EditableField = styled.input`
  color: black;
  background: white !important;
  border-color: rgba(0, 0, 0, 0);
`;

interface EditableFieldWrapProps {
  status: RequestStatusShared;
  isOnlyOne: boolean;
}

const statusColors = {
  pending: '#ffd476',
  done: '#0ddf53',
  failed: '#FF0021',
};

const getColorByStatus = (status: RequestStatusShared) =>
  (status && statusColors[status]) || `#eeeeee`;

export const EditableFieldWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;

  --border-color: ${({ status }: EditableFieldWrapProps) =>
    getColorByStatus(status)};
  border: 1px solid var(--border-color);
  border-radius: 0;
  border-bottom-color: white;
  width: 145px;
  padding: -5px;

  .ant-input,
  .ant-input-affix-wrapper,
  .ant-input-affix-wrapper:hover,
  .ant-input-affix-wrapper-focused {
    border: 0;
    box-shadow: 0;
  }

  ${(props: EditableFieldWrapProps) =>
    props.isOnlyOne
      ? `
      border-radius: 8px;
      .ant-input-affix-wrapper {
      border-radius: 8px;
    }`
      : `
    .ant-input-affix-wrapper {
      border-radius: 0px;
    }
    
    &:first-child {
      border-radius: 8px 8px 0 0;
      
      .ant-input-affix-wrapper {
          border-radius: 8px 8px 0 0;
        }
    }
    
    &:last-child {
        border-radius: 0 0 8px 8px;
        .ant-input-affix-wrapper {
            border-radius: 0 0 8px 8px;
        }
    }
  `}

  &:last-child {
    border-bottom-color: var(--border-color);
  }
`;
