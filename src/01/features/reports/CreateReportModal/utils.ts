export function downloadURI(uri: string, name: string, isZipped?: boolean) {
  const link = document.createElement('a');

  link.download = name;
  link.href = uri;
  link.setAttribute('download', `${name}.${isZipped ? 'zip' : 'xlsx'}`);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}
