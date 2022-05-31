import styled from 'styled-components';
import { SearchFieldType } from './AddressSearch.types';

function getGridTemplateByField(lastField: SearchFieldType) {
  const templates = {
    [SearchFieldType.City]: '0.5fr',
    [SearchFieldType.Street]: '0.9fr',
    [SearchFieldType.House]: '0.3fr',
    [SearchFieldType.Corpus]: '0.3fr',
    [SearchFieldType.Apartment]: '0.3fr',
  };

  const lastFieldIndex = Object.keys(templates).lastIndexOf(lastField);
  const fields = Object.values(templates).slice(0, lastFieldIndex + 1);

  return fields.join(' ');
}

export const Wrapper = styled.div<{ lastField: SearchFieldType }>`
  display: grid;
  grid-template-columns: ${({ lastField }) =>
    getGridTemplateByField(lastField)};
  grid-gap: 15px;
`;
