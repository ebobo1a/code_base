export function getRandomDateInNextMonth(): Date {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const lastDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  const start = nextMonth.getTime();
  const end = lastDayOfNextMonth.getTime();

  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime);
}
