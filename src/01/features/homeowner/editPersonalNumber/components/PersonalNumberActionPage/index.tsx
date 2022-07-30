import { useStore } from "effector-react";
import React, { ReactNode } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { Flex } from "../../../../../shared/ui/Layout/Flex";
import { ButtonTT } from "../../../../../tt-components";
import { Space } from "../../../../../shared/ui/Layout/Space/Space";
import { Loader } from "../../../../../components";
import { Title } from "../../../../../_components/Headers";
import { GoBack } from "../../../../../../ui-kit/shared_components/GoBack";
import { getApartmentAddressString } from "../../../../../../utils/getApartmentAddress";
import { $apartment, ApartmentGate } from "../../../../apartments/displayApartment/models";

interface Props {
  title: string;
  onSaveHandler?(): void;
  onCancelHandler?(): void;
  loading?: boolean;
  type?: "split";
  saveButtonText?: string;
  cancelButtonText?: string;
  children: ReactNode;
}

export const PersonaNumberActionPage: React.FC<Props> = ({
  children,
  title,
  onSaveHandler,
  onCancelHandler,
  loading,
  type,
  saveButtonText,
  cancelButtonText,
}) => {
  const apartment = useStore($apartment);

  const isSplit = type === "split";

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const address = apartment && getApartmentAddressString(apartment);

  return (
    <Wrap>
      <ApartmentGate id={Number(id)} />
      <GoBack />
      <Title>{title}</Title>
      {address}
      <Space />
      {children}
      <Flex style={{ justifyContent: "flex-end" }}>
        <ButtonTT
          color={"white"}
          key="back"
          onClick={onCancelHandler || history.goBack}
        >
          {cancelButtonText || "Отмена"}
        </ButtonTT>
        <Space />
        <ButtonTT
          color="blue"
          key="submit"
          disabled={loading}
          onClick={onSaveHandler}
        >
          {loading ? (
            <Loader show />
          ) : isSplit ? (
            saveButtonText || "Далее"
          ) : (
            "Сохранить изменения"
          )}
        </ButtonTT>
      </Flex>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 620px;
`;
