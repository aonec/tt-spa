export type PhoneNumberFieldProps = {
  phoneNumbers: string[];
  addPhoneNumber?: (phone: {
    phoneNumber: string;
    oldPhoneNumber: string | null;
  }) => void;
  deletePhoneNumber?: (payload: string) => void;
};
