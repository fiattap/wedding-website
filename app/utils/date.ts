// Utility for date formatting and countdown

export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options || { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getCountdown(targetDate: string) {
  const now = new Date();
  const then = new Date(targetDate);
  const diff = then.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}
