export type DevelopmentSettingsModalProps = {
  visible: boolean;
  closeDevSettingsModal: () => void;
  setDevUrl: (url: string) => void;
  devUrl: string;
};
