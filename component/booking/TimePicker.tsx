import React, { useMemo, useState } from "react";

interface TimePickerProps {
  selectedHour: string;
  selectedMinute: string;
  selectedSecond: string;
  onHourChange: (hour: string) => void;
  onMinuteChange: (minute: string) => void;
  onSecondChange: (second: string) => void;
  onConfirm: () => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  selectedHour,
  selectedMinute,
  selectedSecond,
  onHourChange,
  onMinuteChange,
  onSecondChange,
  onConfirm,
}) => {
  const minuteOptions: string[] = useMemo(() => Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")), []);

  const initialPeriod: "AM" | "PM" = parseInt(selectedHour, 10) >= 12 ? "PM" : "AM";
  const initialHour12 = (() => {
    const h24 = parseInt(selectedHour, 10);
    const h = h24 % 12;
    return String(h === 0 ? 12 : h);
  })();

  const [period, setPeriod] = useState<"AM" | "PM">(initialPeriod);
  const [hour12, setHour12] = useState<string>(initialHour12);

  const applyHourChange = (newHour12: number, newPeriod: "AM" | "PM") => {
    let h24 = newHour12 % 12;
    if (newPeriod === "PM") h24 = h24 === 12 ? 12 : h24 + 12;
    if (newPeriod === "AM") h24 = h24 === 12 ? 0 : h24;
    onHourChange(String(h24).padStart(2, "0"));
    setHour12(String(newHour12));
  };

  const incrementHour = () => {
    const next = (parseInt(hour12, 10) % 12) + 1;
    applyHourChange(next, period);
  };

  const decrementHour = () => {
    const prev = parseInt(hour12, 10) - 1 <= 0 ? 12 : parseInt(hour12, 10) - 1;
    applyHourChange(prev, period);
  };

  const incrementMinute = () => {
    const idx = minuteOptions.indexOf(selectedMinute);
    const next = minuteOptions[(idx + 1) % minuteOptions.length];
    onMinuteChange(next);
  };

  const decrementMinute = () => {
    const idx = minuteOptions.indexOf(selectedMinute);
    const prev = minuteOptions[(idx - 1 + minuteOptions.length) % minuteOptions.length];
    onMinuteChange(prev);
  };

  const handlePeriodChange = (p: "AM" | "PM") => {
    setPeriod(p);
    applyHourChange(parseInt(hour12, 10), p);
  };

  return (
    <div className="absolute z-30 left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-full">
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-2">Hour</div>
          <button onClick={(e) => { e.stopPropagation(); decrementHour(); }} className="w-full text-gray-600">
            ▲
          </button>
          <div className="max-h-40 overflow-y-auto mt-1">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((h) => (
              <div
                key={h}
                onClick={(e) => { e.stopPropagation(); applyHourChange(h, period); }}
                className={`py-1 cursor-pointer ${parseInt(hour12, 10) === h ? "text-primary font-semibold" : "text-gray-500"}`}
              >
                {String(h)}
              </div>
            ))}
          </div>
          <button onClick={(e) => { e.stopPropagation(); incrementHour(); }} className="w-full text-gray-600">
            ▼
          </button>
        </div>

        <div className="text-center">
          <div className="text-xs text-gray-500 mb-2">Minute</div>
          <button onClick={(e) => { e.stopPropagation(); decrementMinute(); }} className="w-full text-gray-600">
            ▲
          </button>
          <div className="max-h-40 overflow-y-auto mt-1">
            {minuteOptions.map((m) => (
              <div
                key={m}
                onClick={(e) => { e.stopPropagation(); onMinuteChange(m); }}
                className={`py-1 cursor-pointer ${selectedMinute === m ? "text-primary font-semibold" : "text-gray-500"}`}
              >
                {m}
              </div>
            ))}
          </div>
          <button onClick={(e) => { e.stopPropagation(); incrementMinute(); }} className="w-full text-gray-600">
            ▼
          </button>
        </div>

        <div className="text-center">
          <div className="text-xs text-gray-500 mb-2">Period</div>
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); handlePeriodChange("AM"); }}
              className={`w-20 py-2 rounded-lg border ${period === "AM" ? "bg-primary text-white" : "bg-white border-gray-300 text-gray-600"}`}
            >
              AM
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handlePeriodChange("PM"); }}
              className={`w-20 py-2 rounded-lg border ${period === "PM" ? "bg-primary text-white" : "bg-white border-gray-300 text-gray-600"}`}
            >
              PM
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onConfirm();
        }}
        className="w-full py-2 mt-4 bg-primary text-white rounded-lg font-medium"
      >
        Save
      </button>
    </div>
  );
};
