import styled from 'styled-components';

export const HeaderStyles = `
  display: none;
`;

export const PhoneNumber = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ReadingDate = styled.div`
  font-size: 12px;
  color: rgba(39, 47, 90, 0.7);
`;

export const ReadingValue = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 16px;
  align-items: center;
`;

export const ReadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 300px 110px 150px 180px 170px 170px 170px 400px;
  grid-gap: 16px;

  height: 48px;
  width: fit-content;
  padding: 0 0 0 16px;

  background: #f3f5f6;

  user-select: none;
  position: sticky;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
`;
