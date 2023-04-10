import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 48px 96px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 200px 60px;
`;

export const IconsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
`;

export const IconInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s;
  height: 42px;
  cursor: pointer;
  border-radius: 6px;
  padding: 0 16px;

  &:hover {
    color: #189ee9;
    box-shadow: 0 6px 12px rgba(0, 0, 48, 0.16);
  }
`;

export const IconName = styled.div`
  margin-left: 16px;
  font-weight: 400;
  font-weight: bold;
`;

export const IconWrapper = styled.div`
  width: 20px;
  display: flex;
  justify-content: flex-end;
`;
