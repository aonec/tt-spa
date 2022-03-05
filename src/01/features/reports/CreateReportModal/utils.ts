export function downloadURI(uri: string, name: string) {
  const link = document.createElement('a');

  link.download = name;
  link.href = uri;
  link.setAttribute('download', `${name}.xlsx`);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}
