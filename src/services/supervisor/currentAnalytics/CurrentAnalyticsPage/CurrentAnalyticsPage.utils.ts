export const splitArrayForDashboard = <T>(
  arr: T[],
): { panels: T[]; others: T[] } => {
  return {
    panels: arr.slice(0, 2),
    others: arr.slice(2),
  };
};
