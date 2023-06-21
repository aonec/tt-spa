import styled from 'styled-components';

export const StyledReadingsValues = styled.div<{ colorText: string | null }>`
  border: ${({ colorText }) => `1px solid ${colorText || 'gray'}`};
  border-left-width: 3px;
  padding-left: 10px;
  border-radius: 8px;
  width: min-content;
  min-width: 150px;
`;

export const ReadingValue = styled.div<{ colorText: string | null }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ colorText }) => `1px solid ${colorText || 'gray'}`};

  padding: 5px 5px 5px 0;

  &:last-child {
    border-bottom: none;
  }
`;

export const LeftValue = styled.div`
  color: lightgray;
  font-weight: 600;
`;

export const RightValue = styled.div`
  margin-right: 0 10px 0 30px;
`;

export const Line = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  border-bottom: 1px solid lightgray;
  padding: 15px;
`;

export const StyledFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #272f5a08;
  border-radius: 4px;
  margin-bottom: 6px;
  padding: 15px;

  .File__name {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0em;
    color: #272f5ab2;
  }
`;

export const Title = styled.h3`
  margin-bottom: 15px;
`;
