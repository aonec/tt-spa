export type CreateObjectAdditionalInfoStageProps = {
  goBackStage: (payload: void) => void;
  onPageCancel: (payload: void) => void;
  handleAdditionalInfoData: (payload: AdditionalInfo) => void;
};

export type AdditionalInfo = {
  floors: string;
  entrances: string;
  elevater: string;
};
