import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 28px;
`;

export const Title = styled.div`
  font-weight: 300;
  font-size: 40px;
  line-height: 48px;
  color: rgba(39, 47, 90, 0.9);
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
`;

export const Descripion = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.9);
  text-align: center;
`;

export const MailRef = styled.a`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #189ee9;
`;
