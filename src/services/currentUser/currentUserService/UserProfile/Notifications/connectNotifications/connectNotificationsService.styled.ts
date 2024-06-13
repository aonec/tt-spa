import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const QrCodeImg = styled.img`
  width: 200px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OptionWrapper = styled.div`
  font-size: 16px;
  max-width: 500px;

  a {
    color: var(--primary-100);
    font-weight: bold;
    transition: 0.2s;

    &:hover {
      opacity: 0.6;
    }
  }
`;
