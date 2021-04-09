export function isEmpty(errors: any) {
  for (const key in errors) {
    return false;
  }
  return true;
}
