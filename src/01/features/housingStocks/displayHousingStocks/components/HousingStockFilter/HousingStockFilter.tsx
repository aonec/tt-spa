export function fromEnter(callback: () => void) {
  return (e?: any) => {
    if (e?.key === 'Enter') callback();
  };
}
