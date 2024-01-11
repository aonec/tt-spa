export type PhoneNumberFormFieldProps = {
  deletePhoneNumber: (phone: string) => void;
  addPhoneNumber: (phone: string) => void;
  phoneNumbers: string[];
};
