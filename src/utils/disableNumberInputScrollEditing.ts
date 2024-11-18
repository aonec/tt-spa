export const disableNumberInputScrollEdit = () =>
  document.addEventListener('wheel', () => {
    if ((document.activeElement as HTMLInputElement)?.type === 'number') {
      (document.activeElement as HTMLElement)?.blur();
    }
  });
