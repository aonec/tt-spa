import styled from 'styled-components';
import { CustomTemplateType, SearchFieldType } from './AddressSearch.types';

function getGridTemplateByFields(
  fields: SearchFieldType[],
  customTemplate?: CustomTemplateType,
) {
  const customTemplateObject = customTemplate?.reduce(
    (acc, elem) => ({ ...acc, [elem.fieldType]: elem.templateValue }),
    {},
  );

  const templates = {
    [SearchFieldType.City]: '0.5fr',
    [SearchFieldType.Street]: '0.9fr',
    [SearchFieldType.House]: '0.3fr',
    [SearchFieldType.Corpus]: '0.3fr',
    [SearchFieldType.Apartment]: '0.3fr',
    [SearchFieldType.Question]: '0.4fr',
    ...customTemplateObject,
  };

  return fields.map((field) => templates[field]).join(' ');
}

export const Wrapper = styled.div<{
  fields: SearchFieldType[];
  customTemplate?: CustomTemplateType;
}>`
  display: grid;
  grid-template-columns: ${({ fields, customTemplate }) =>
    getGridTemplateByFields(fields, customTemplate)};
  grid-gap: 15px;
`;
