import React, { FC } from 'react';
import { EditNewHeatingPointModalProps } from './EditNewHeatingPointModal.types';
import { StyledModal } from '01/shared/ui/Modal/Modal';
import { StyledSelect } from '01/shared/ui/Select/components';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { GridContainer } from '../CreateObjectMainInfoStage.styled';
import {
  Footer,
  Header,
  MarginSide,
  Wrapper,
} from '../CreateNewHeatingPointModal/CreateNewHeatingPointModal.styled';
import { Input } from 'ui-kit/Input';

export const EditNewHeatingPointModal: FC<EditNewHeatingPointModalProps> = ({
  isEditModalOpen,
  setEditModalOpen,
}) => {
  return (
    <Wrapper>
      <StyledModal
        centered
        visible={isEditModalOpen}
        onCancel={() => setEditModalOpen(false)}
        width={800}
        title={
          <>
            <Header>Редактирование ТП</Header>
          </>
        }
        footer={
          <Footer>
            <MarginSide>
              <Button type="ghost" onClick={() => setEditModalOpen(false)}>
                Отмена
              </Button>
            </MarginSide>
            <Button sidePadding={25} onClick={() => {}} disabled={false}>
              Сохранить измениния
            </Button>
          </Footer>
        }
      >
        <GridContainer>
          <FormItem label="Тип ТП">
            <StyledSelect
              placeholder="Выберите из списка"
              onChange={(value) => {}}
            >
              <Select.Option value={''}>{}</Select.Option>
            </StyledSelect>
          </FormItem>

          <FormItem label="Номер ТП">
            <Input placeholder="Введите" />
          </FormItem>
        </GridContainer>
      </StyledModal>
    </Wrapper>
  );
};
