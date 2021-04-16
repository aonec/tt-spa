import React, { Dispatch, SetStateAction } from 'react';
import ButtonTT from '../../../../../tt-components/ButtonTT';
import styled from 'styled-components';
import { Modal } from 'antd';
import { ReportModalType } from '../../../ObjectsSearchForm/components/Header';

const CurrentEmailModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<ReportModalType>>;
}) => {
  return (
    <StyledModal
      visible={visible}
      title={<Header>Отправить отчёт на почту</Header>}
      width={800}
      footer={
        <Footer>
          <ButtonTT
            color={'white'}
            key="submit"
            onClick={() => setVisible(undefined)}
          >
            Отмена
          </ButtonTT>
          <ButtonTT
            color={'white'}
            key="submit"
            onClick={() => setVisible('otherEmailForm')}
          >
            Указать другую почту
          </ButtonTT>
          <ButtonTT color={'blue'} key="back" onClick={() => alert('net')}>
            Отправить отчёт
          </ButtonTT>
        </Footer>
      }
    >
      <p style={{ color: 'var(--main-100)', margin: 0 }}>
        Вы внесли не все показания, если вы покинете страницу, то все изменения,
        которые были сделаны вами на этой странице не сохранятся
      </p>
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

const Header = styled.h1`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 300;
  margin: 0;
`;

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 24px 32px;
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

export default CurrentEmailModal;
