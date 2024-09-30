export function toMinutes(minutes: number) {
  const expirationDate = new Date(new Date().getTime() + minutes * 60 * 1000);
  return expirationDate;
}

export function convertGMTToLocalTime(gmtTime: string): string {
  const gmtDate = new Date(gmtTime + " GMT");

  // Get the local date string in the desired format
  const localDate = gmtDate.toLocaleDateString("en-GB"); // 'en-GB' gives the format DD/MM/YYYY

  // Get the local time string in the desired format
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour time format
  };
  const localTime = gmtDate.toLocaleTimeString("en-US", options); // 'en-US' for AM/PM format

  // Concatenate date and time with a hyphen
  const formattedLocalTime = `${localDate} - ${localTime}`;

  return formattedLocalTime;
}

// Receives a function and its params as param and log its name and execution time
// Usage: measurePerformance(getCurrentTime);
export function measurePerformance<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): { result: ReturnType<T>; executionTime: number } {
  const startTime = performance.now();
  const result = fn(...args);
  const endTime = performance.now();
  const executionTime = (endTime - startTime) / 1000;

  console.log(`Performance: ${fn.name} executed in ${executionTime} seconds`);

  return { result, executionTime };
}
