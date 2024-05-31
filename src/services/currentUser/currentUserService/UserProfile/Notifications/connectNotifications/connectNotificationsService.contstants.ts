import { isDevMode } from 'api/axios';
import botStageQrCode from './assets/qr_stage_bot.jpg';
import botProdQrCode from './assets/qr_bot.png';

export const botData = isDevMode
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
