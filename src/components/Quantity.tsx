"use client";
import { Minus, Plus } from "lucide-react";
export function Quantity({
  value,
  onChange,
  label = "Quantity",
}: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  return (
    <div
      className="inline-flex h-11 shrink-0 items-center rounded-lg border border-line bg-white"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className="grid h-10 w-10 place-items-center text-muted hover:bg-canvas disabled:opacity-30"
      >
        <Minus size={15} />
      </button>
      <span
        className="min-w-8 text-center text-sm font-bold"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        disabled={value >= 9999}
        onClick={() => onChange(value + 1)}
        className="grid h-10 w-10 place-items-center text-muted hover:bg-canvas disabled:opacity-30"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
