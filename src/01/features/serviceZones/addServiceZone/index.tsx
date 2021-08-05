import React from 'react';
import {
  sendServiceZoneButtonClicked,
  okButtonClicked,
  cancelButtonClicked,
  $addZoneInput,
  $isAddServiceModalShown,
  $addZoneStatus,
} from './models';
import { useStore } from 'effector-react';
import ButtonTT from '../../../tt-components/ButtonTT';
import InputTT from '../../../tt-components/InputTT';
import styled from 'styled-components';
import { Form, Modal } from 'antd';
import Header from '../../../tt-components/Header/index';
import { Loader } from '../../../_components/Loader/index';
import { inputChanged } from './models/init';

const AddNewZonesModal = () => {
  const input = useStore($addZoneInput);
  const isModalVisible = useStore($isAddServiceModalShown);
  const addZoneStatus = useStore($addZoneStatus);
  const isZoneLoading = addZoneStatus === 'loading';
  const isAddZoneError = addZoneStatus === 'error';
  const addZoneErrorMessage = isAddZoneError
    ? 'Произошла ошибка добавления. Попробуйте позже или обратитесь в техподдержку'
    : '';
  const addZoneValidationStatus = isAddZoneError ? 'error' : '';

  const sendButtonHandler = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendServiceZoneButtonClicked();
  };

  return (
    <StyledModal
      onOk={() => okButtonClicked()}
      onCancel={() => cancelButtonClicked()}
      title={<Header>Новая зона обслуживания</Header>}
      visible={isModalVisible}
      width={800}
      footer={
        <Footer>
          <ButtonTT
            color={'white'}
            key="back"
            onClick={() => cancelButtonClicked()}
            disabled={isZoneLoading}
          >
            Отмена
          </ButtonTT>
          <ButtonTT
            color={'blue'}
            key="submit"
            onClick={sendButtonHandler}
            disabled={isZoneLoading}
          >
            Добавить зону
          </ButtonTT>
        </Footer>
      }
    >
      <Form>
        <label style={{ color: 'var(--main-70)', fontWeight: 500 }}>
          Зона:
        </label>
        {isZoneLoading ? (
          <Loader show />
        ) : (
          <Form.Item
            validateStatus={addZoneValidationStatus}
            help={addZoneErrorMessage}
          >
            <InputTT
              onChange={inputChanged}
              value={input}
              style={{ marginTop: 8 }}
            />
          </Form.Item>
        )}
      </Form>
    </StyledModal>
  );
};

const Footer = styled.div`
  background-color: var(--bg);
  height: 96px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 32px;
  font-weight: 700;
`;

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 24px 32px 0 32px;
    border: 0;
  }

  .ant-modal-body {
    padding: 0 32px 32px 32px;
  }

  .ant-modal-footer {
    padding: 0;
  }

  .ant-modal-close-x {
    fill: var(--main-100);
  }

  .ant-modal-footer button + button {
    margin-bottom: 0;
    margin-left: 16px;
  }
`;

export default AddNewZonesModal;
