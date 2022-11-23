import { StyledModal } from '01/shared/ui/Modal/Modal';
import { StyledSelect } from '01/shared/ui/Select/components';
import { ButtonTT, InputTT } from '01/tt-components';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { GridContainer } from '../CreateObjectMainInfoStage.styled';
import {
  Footer,
  Header,
  MarginSide,
  Wrapper,
} from './CreateNewHeatingPointModal.styled';
import { CreateNewHeatingPointModalProps } from './CreateNewHeatingPointModal.types';

export const CreateNewHeatingPointModal: FC<CreateNewHeatingPointModalProps> = ({
  isModalOpen,
  setModalOpen,
}) => {
  return (
    <Wrapper>
      <StyledModal
        centered
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        width={800}
        title={
          <>
            <Header>Создание нового ТП</Header>
          </>
        }
        footer={
          <Footer>
            <MarginSide>
              <ButtonTT color="white" onClick={() => setModalOpen(false)}>
                Отмена
              </ButtonTT>
            </MarginSide>
            <Button sidePadding={45} onClick={() => {}} disabled={false}>
              Создать
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
            <InputTT placeholder="Введите" />
          </FormItem>
        </GridContainer>
      </StyledModal>
    </Wrapper>
  );
};
