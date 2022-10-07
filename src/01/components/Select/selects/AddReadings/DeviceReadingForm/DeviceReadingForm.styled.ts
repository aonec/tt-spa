import styled from "styled-components";

export const DeviceReadingsContainer = styled.div`
display: flex;
flex-direction: column;
border-radius: 4px;
border: 1px solid ${(props) => (props.color ? props.color : 'var(--main-90)')};
border-left-width: 4px;
max-width: 200px;
padding: 8px 8px 8px 12px;

&:focus-within {
  box-shadow: var(--shadow);
}

.ant-input-affix-wrapper:focus,
.ant-input-affix-wrapper-focused {
  box-shadow: none;
}
`;