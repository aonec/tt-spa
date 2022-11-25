export type CreateObjectAdditionalInfoStageProps = {
  goBackStage: () => void;
  onPageCancel: () => void;
  handleAdditionalInfoData: (payload: AdditionalInfo) => void;
};

export type AdditionalInfo = {
  floors: string;
  entrances: string;
  elevater: string;
};
