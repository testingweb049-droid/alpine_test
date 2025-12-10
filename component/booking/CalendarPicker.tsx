import React, { JSX } from "react";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDate,
  isDateDisabled,
  isToday,
} from "@/utils/dateUtils";

interface CalendarPickerProps {
  currentMonth: Date;
  pickupDate: string;
  onDateSelect: (day: number) => void;
  onNavigateMonth: (direction: number) => void;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  currentMonth,
  pickupDate,
  onDateSelect,
  onNavigateMonth,
}) => {
  const renderCalendarDays = (): JSX.Element[] => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: JSX.Element[] = [];

    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    const prevMonthDays = getDaysInMonth(prevMonth);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="text-gray-400 p-2 text-center text-sm">
          {prevMonthDays - i}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      const isSelected = pickupDate === formatDate(currentDate);
      const disabled = isDateDisabled(i, currentMonth);
      const today = isToday(i, currentMonth);
      days.push(
        <div
          key={`current-${i}`}
          className={`p-2 text-center cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto text-sm ${
            isSelected
              ? "bg-primary text-white"
              : disabled
              ? "text-gray-400 cursor-not-allowed"
              : today
              ? "bg-blue-100 text-primary font-semibold"
              : "hover:bg-gray-200 text-gray-800"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onDateSelect(i);
          }}
        >
          {i}
        </div>
      );
    }

    const totalCells = 42;
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div key={`next-${i}`} className="text-gray-400 p-2 text-center text-sm">
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div
      className="absolute z-30 left-0 top-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigateMonth(-1);
          }}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="font-semibold text-gray-800">
          {currentMonth.toLocaleString("en-US", { month: "long", timeZone: "Europe/Zurich" })}{" "}
          {currentMonth.getFullYear()}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigateMonth(1);
          }}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="font-medium p-2 text-gray-600">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">{renderCalendarDays()}</div>
    </div>
  );
};

