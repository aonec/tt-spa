type Name = {
  firstname: string | null | undefined;
  middlename: string | null | undefined;
  lastname: string | null | undefined;
};

export const getUserFullName = (name: Name) => {
  const { firstname, lastname, middlename } = name;

  const firstnameText = firstname ? `${firstname}` : '';
  const lastnameText = lastname ? ` ${lastname}` : '';
  const middlenameText = middlename ? ` ${middlename}` : '';

  return `${firstnameText}${middlenameText}${lastnameText}`;
};
