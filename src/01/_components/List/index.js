import styled from 'styled-components';

export const Title = styled.h2`
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 16px;
`;

export const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`;

export const ListItem = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 48px;
align-items: center;
border-bottom: 1px solid var(--frame);
&[|url] {
  cursor: pointer;
  font-weight: 500;
  opacity: 1;
  &:hover {
    color: var(--primary-100);
  }
}
& span {
  padding: 8px;
  opacity: 0.7;
  &:first-of-type {
    opacity: 0.9;
    font-weight: normal;
  }
}
}
`;
