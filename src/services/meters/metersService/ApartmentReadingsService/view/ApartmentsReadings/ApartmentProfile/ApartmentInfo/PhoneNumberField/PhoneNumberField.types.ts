export type PhoneNumberFieldProps = {
  phoneNumbers: string[];
  addPhoneNumber?: (phoneNumber: string) => void;
  replacePhoneNumber?: (phone: {
    phoneNumber: string;
    oldPhoneNumber: string;
  }) => void;
  deletePhoneNumber?: (payload: string) => void;
};
