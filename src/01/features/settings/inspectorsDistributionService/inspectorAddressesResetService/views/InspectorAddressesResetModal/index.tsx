import { Form } from "antd";
import { useForm } from "effector-forms/dist";
import React, { FC } from "react";
import { ModalTT } from "../../../../../../shared/ui/ModalTT";
import { Select } from "../../../../../../shared/ui/Select";
import { FormWrap } from "./components";
import { InspectorAddressesResetModalProps } from "./types";

export const InspectorAddressesResetModal: FC<
  InspectorAddressesResetModalProps
> = ({
  isOpen,
  handleClose,
  handleResetAddress,
  form,
  loading,
  inspectorsList,
}) => {
  const { fields } = useForm(form);
  return (
    <ModalTT
      title="Сбросить все адреса"
      saveBtnText="Сбросить все адреса"
      visible={isOpen}
      onCancel={handleClose}
      onSubmit={handleResetAddress}
      loading={loading}
    >
      <FormWrap>
        <Form.Item label="Сотрудник">
          <Select
            allowClear
            placeholder="Выберите из списка"
            value={fields.inspectorId.value || undefined}
            onChange={(value) =>
              fields.inspectorId.onChange(Number(value) || null)
            }
          >
            {inspectorsList?.map((elem) => (
              <Select.Option key={elem.id} value={elem.id}>
                {elem.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </FormWrap>
    </ModalTT>
  );
};
