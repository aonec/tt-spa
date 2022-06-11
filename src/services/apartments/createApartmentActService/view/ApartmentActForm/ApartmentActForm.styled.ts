import styled from 'styled-components'

export const FieldsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr) !important;
    grid-column-gap: 16px;

`

export const ErrorMessage = styled.div`
  margin: 5px 0 5px;
  color: red;
`;