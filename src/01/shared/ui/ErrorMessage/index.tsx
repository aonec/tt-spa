import { ReactNode } from "react";
import styled from "styled-components";

export const ErrorMessage = styled.div<{ children?: ReactNode }>`
  margin: 5px 0 5px;
  color: red;
`;
