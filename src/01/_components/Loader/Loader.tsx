/* eslint-disable */

import styled, { css } from "@reshadow/macro";
import { FC } from "react";
import { Icon } from "../../components/Icon";
import { LoaderProps } from "./Loader.types";

const style = css`
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  Icon {
    animation: spin 1000ms linear infinite;
    margin: 0 auto;
  }
`;

export const Loader: FC<LoaderProps> = ({
  children = null,
  show = false,
  size = 32,
}) => {
  const loader = styled(style)(<Icon icon="replacement" size={Number(size)} />);
  return show ? loader : children;
};
