import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PencilIcon, TrashIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  height: 48px;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #dcdee4;
`;

export const LinkSC = styled(Link)`
  display: flex;
  align-items: center;

  gap: 8px;
  &:hover {
    > div {
      color: #189ee9;
    }
  }
`;

export const ModelWrapper = styled.div`
  color: #272f5a;
  font-weight: 500;
`;

export const SerialWrapper = styled.div`
  color: #272f5ab2;
`;

export const DatesWrapper = styled.div`
  color: #272f5ab2;
`;

export const PencilIconSC = styled(PencilIcon)`
  cursor: pointer;
`;

export const TrashIconSC = styled(TrashIcon)`
  cursor: pointer;
  margin-left: 8px;
`;
