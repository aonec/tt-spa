export function checkDocExtension(url: string): boolean {
  const cleanUrl = url.split('?')[0];

  const extension = cleanUrl.split('.').pop()?.toLowerCase();

  if (extension === 'pdf') {
    window.open(url, '_blank');
    return false;
  }

  return Boolean(url);
}
