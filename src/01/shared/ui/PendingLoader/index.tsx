import { Skeleton } from "antd";
import React, { ReactNode } from "react";
import { Loader } from "../../../components";
import { Flex } from "../Layout/Flex";

interface Props {
  loading: boolean;
  skeleton?: boolean;
  children?: ReactNode;
}

export const PendingLoader: React.FC<Props> = ({
  children,
  loading,
  skeleton,
}) => {
  return (
    <>
      {loading ? (
        skeleton ? (
          <Skeleton active />
        ) : (
          <Flex style={{ justifyContent: "center", marginTop: 25 }}>
            <Loader size={32} show />
          </Flex>
        )
      ) : (
        children
      )}
    </>
  );
};
