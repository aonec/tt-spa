import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  border-radius: 4px;
  padding: 16px;
  margin-top: 16px;
  max-height: 360px;
  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: rgba(39, 47, 90, 0.9);
  font-weight: 500;
  font-size: 14px;
`;

export const Description = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-weight: 300;
  font-size: 12px;
  color: rgba(39, 47, 90, 0.8);
`;

export const ListWrapper = styled.div`
  margin-top: 16px;
`;
