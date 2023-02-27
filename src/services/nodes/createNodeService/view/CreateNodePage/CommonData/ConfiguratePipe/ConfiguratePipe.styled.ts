import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);

  padding: 16px;
  margin-top: 8px;

  &:first-child {
    margin-top: 0px;
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  transform: translateY(-5px);

  gap: 8px;
`;

export const LabelSC = styled.label`
  color: #272f5ab2;
  font-weight: 500;
  user-select: none;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 4px;

  width: 120px;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 16px;
`;
