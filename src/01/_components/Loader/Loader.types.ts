import { ReactNode } from "react";

export type LoaderProps = {
  children?: ReactNode;
  show: boolean;
  size?: number | string;
};
