import React, { useCallback, useEffect, useState } from 'react';
import { connectNotificationsService } from './connectNotificationsService.models';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { useUnit } from 'effector-react';
import { Input } from 'ui-kit/Input';
import FormItem from 'antd/es/form/FormItem';
import botStageQrCode from './assets/qr_stage_bot.jpg';
import botProdQrCode from './assets/qr_bot.png';
import {
  Content,
  OptionWrapper,
  OptionsWrapper,
  QrCodeImg,
  Wrapper,
} from './connectNotificationsService.styled';
import { message } from 'antd';
import { connectChannelMutation } from './connectNotificationsService.api';
import { isDevMode } from 'api/axios';

const { inputs, outputs } = connectNotificationsService;

const FORM_ID = 'notifications-modal-form';

const botData = isDevMode
  ? {
      image: botStageQrCode,
      link: 'https://t.me/TT_Notification_Service_bot',
      name: '@TT_Notification_Service_bot',
    }
  : {
      image: botProdQrCode,
      link: 'https://t.me/TT_NotificationService_bot',
      name: '@TT_NotificationService_bot',
    };

export const ConnectNotificationsContainer = () => {
  const { isOpen, handleClose, handleConnectChannel } = useUnit({
    isOpen: outputs.$isOpen,
    handleClose: inputs.closeModal,
    handleConnectChannel: connectChannelMutation.start,
  });

  const [code, setCode] = useState('');

  const options = [
    <>
      Перейдите в телеграмм бота{' '}
      <a href={botData.link} target="_blank" rel="noreferrer">
        {botData.name}
      </a>
    </>,
    <>
      Нажмите кнопку <strong>"Запустить"</strong>
    </>,
    <>Скопируйте код и вставьте в поле</>,
  ];

  const handleSave = useCallback(() => {
    if (!code) {
      message.error('Введите код!');
      return;
    }

    handleConnectChannel(code);
  }, [code, handleConnectChannel]);

  useEffect(() => {
    setCode('');
  }, [isOpen]);

  return (
    <FormModal
      visible={isOpen}
      title="Подключить уведомления"
      formId={FORM_ID}
      onCancel={handleClose}
      onSubmit={handleSave}
      form={
        <Wrapper>
          <QrCodeImg src={botData.image} />
          <Content>
            <OptionsWrapper>
              {options.map((option, index) => (
                <OptionWrapper>
                  {index + 1}. {option}
                </OptionWrapper>
              ))}
            </OptionsWrapper>
            <FormItem label="Введите код">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Введите код"
                style={{ width: '250px' }}
              />
            </FormItem>
          </Content>
        </Wrapper>
      }
    />
  );
};
