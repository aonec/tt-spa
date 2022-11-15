export const disableNumberInputScrollEdit = () =>
  document.addEventListener('wheel', () => {
    if ((document.activeElement as any)?.type === 'number') {
      (document.activeElement as any)?.blur();
    }
  });
