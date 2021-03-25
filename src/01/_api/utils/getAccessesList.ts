const getAccessesList = () => {
  const permissions = localStorage.getItem('permissions');
  let show;
  if (permissions === 'undefined' || !permissions) {
    show = (x: string) => false;
    return { show };
  }
  const parsedPermissions = JSON.parse(permissions);
  show = (accessName: string) => parsedPermissions.includes(accessName);
  return { show };
};

export default getAccessesList;
