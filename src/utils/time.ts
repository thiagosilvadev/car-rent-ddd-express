export const numberOfdaysInDateRange = (
  startDate: Date,
  endDate: Date
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(
    Math.abs((start.getTime() - end.getTime()) / oneDay)
  );
  return diffDays;
};
