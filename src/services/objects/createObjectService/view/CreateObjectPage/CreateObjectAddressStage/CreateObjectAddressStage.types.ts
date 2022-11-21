export type CreateObjectAddressStageProps = {
  existingStreets: string[] | null;
  existingCities: string[] | null;
};

export type ObjectAddressValues = {
  city?: string | undefined;
  street?: string | undefined;
  house?: string | undefined;
  corpus?: string | undefined;
};
