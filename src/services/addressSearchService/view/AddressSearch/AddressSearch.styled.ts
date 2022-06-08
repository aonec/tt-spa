import styled from 'styled-components';
import { SearchFieldType } from './AddressSearch.types';

function getGridTemplateByFields(fields: SearchFieldType[]) {
  const templates = {
    [SearchFieldType.City]: '0.5fr',
    [SearchFieldType.Street]: '0.9fr',
    [SearchFieldType.House]: '0.3fr',
    [SearchFieldType.Corpus]: '0.3fr',
    [SearchFieldType.Apartment]: '0.3fr',
  };

  return fields.map((field) => templates[field]).join(' ');
}

export const Wrapper = styled.div<{ fields: SearchFieldType[] }>`
  display: grid;
  grid-template-columns: ${({ fields }) => getGridTemplateByFields(fields)};
  grid-gap: 15px;
`;
