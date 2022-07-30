import React, { ReactNode } from "react";
import styled from "styled-components";
import { Tooltip } from "antd";

const OpacityContainer = styled.span`
  svg {
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }

  display: flex;
  align-items: flex-start;
  margin-left: 8px;
`;

interface IconWithTooltipProps {
  title: string;
  children?: ReactNode;
}

export const IconWithTooltip: React.FC<IconWithTooltipProps> = ({
  title,
  children,
}) => {
  return (
    <Tooltip title={title} color="var(--main-100)">
      <OpacityContainer>{children}</OpacityContainer>
    </Tooltip>
  );
};
