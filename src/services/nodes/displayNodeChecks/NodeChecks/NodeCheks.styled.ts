import styled from 'styled-components';

export const Button = styled.div`
  cursor: pointer;
  margin-top: 16px;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
`;

export const IconsWrapper = styled(GroupWrapper)`
  svg {
    cursor: pointer;
  }
`;

export const DocumentInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding-right: 16px;
`;

export const DocumentNameWrapper = styled.div`
  color: #272f5a;
  font-weight: 500;
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NoDocumentText = styled.span`
  color: '#b3b3b3';
`;

export const styles = `
    width: 100%;
`;
