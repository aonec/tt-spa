import styled, { css } from 'styled-components';
import { AutoComplete as AutoCompleteAntD } from 'antd';
import { CustomTemplateType, SearchFieldType } from './AddressSearch.types';
import { Input } from 'ui-kit/Input';
import { AutoComplete } from 'ui-kit/AutoComplete';

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

const errorBorderStyle = css`
  border-color: #fc525b !important;
`;

const errorFocusedStyle = css`
  box-shadow: 0 0 0 2px rgba(252, 82, 91, 0.2) !important;
`;

export const InputSC = styled(Input)<{ error?: boolean }>`
  ${({ error }) => error && errorBorderStyle}

  &:focus {
    ${({ error }) => error && errorFocusedStyle}
  }
`;

export const AutoCompleteSC = styled(AutoComplete)<{ error?: boolean }>`
  .ant-select-selector {
    ${({ error }) => error && errorBorderStyle}
  }

  &.ant-select-focused {
    .ant-select-selector {
      ${({ error }) => error && errorFocusedStyle};
    }
  }
`;

export const AutoCompleteAntdSC = styled(AutoCompleteAntD)`
  .ant-select-item-option-active {
    background-color: rgb(24, 158, 233) !important;
  }
  
`;
