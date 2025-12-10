// Get current date/time in Switzerland timezone
export const getSwissDate = (): Date => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const year = parseInt(parts.find(p => p.type === "year")?.value || "0");
  const month = parseInt(parts.find(p => p.type === "month")?.value || "0") - 1;
  const day = parseInt(parts.find(p => p.type === "day")?.value || "0");
  const hour = parseInt(parts.find(p => p.type === "hour")?.value || "0");
  const minute = parseInt(parts.find(p => p.type === "minute")?.value || "0");
  const second = parseInt(parts.find(p => p.type === "second")?.value || "0");
  return new Date(year, month, day, hour, minute, second);
};

// Get date in Switzerland timezone from a date (for date-only comparisons)
export const getSwissDateFromDate = (date: Date): Date => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const year = parseInt(parts.find(p => p.type === "year")?.value || "0");
  const month = parseInt(parts.find(p => p.type === "month")?.value || "0") - 1;
  const day = parseInt(parts.find(p => p.type === "day")?.value || "0");
  return new Date(year, month, day);
};

// Get current time in Switzerland timezone as string (HH:mm)
export const getSwissTime = (): string => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Zurich",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formatter.format(now);
};

export const getDaysInMonth = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const getFirstDayOfMonth = (date: Date): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1; // Monday-start
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${day} ${monthNames[month]} ${year}`;
};

export const formatDateSwiss = (date: Date): string => {
  const swissDate = getSwissDateFromDate(date);
  const day = String(swissDate.getDate()).padStart(2, "0");
  const month = String(swissDate.getMonth() + 1).padStart(2, "0");
  const year = swissDate.getFullYear();
  return `${day}.${month}.${year}`;
};

export const isDateDisabled = (day: number, currentMonth: Date): boolean => {
  // Create date in Switzerland timezone directly
  const today = getSwissDate();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  
  const selectedYear = currentMonth.getFullYear();
  const selectedMonth = currentMonth.getMonth();
  const selectedDay = day;
  
  // Compare dates directly
  if (selectedYear < todayYear) return true;
  if (selectedYear > todayYear) return false;
  if (selectedMonth < todayMonth) return true;
  if (selectedMonth > todayMonth) return false;
  return selectedDay < todayDay;
};

export const isToday = (day: number, currentMonth: Date): boolean => {
  const today = getSwissDate();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  
  const selectedYear = currentMonth.getFullYear();
  const selectedMonth = currentMonth.getMonth();
  const selectedDay = day;
  
  return selectedYear === todayYear && 
         selectedMonth === todayMonth && 
         selectedDay === todayDay;
};

