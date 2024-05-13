type UserInfo = {
  firstname: string | null;
  middlename: string | null;
  lastname: string | null;
};

export const getUserFullName = (name: UserInfo) => {
  const { firstname, lastname, middlename } = name;

  let result = '';

  if (firstname) {
    result += `${firstname} `;
  }
  if (lastname) {
    result += `${lastname} `;
  }
  if (middlename) {
    result += `${middlename} `;
  }

  return result;
};
