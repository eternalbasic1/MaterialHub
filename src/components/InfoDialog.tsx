"use client";
import { useRef, type ReactNode } from "react";
import { X, Construction } from "lucide-react";
export function InfoDialog({
  title,
  children,
  label,
  triggerLabel,
  className = "",
}: {
  title: string;
  children: ReactNode;
  label: ReactNode;
  triggerLabel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        aria-label={triggerLabel}
        className={className}
        onClick={() => ref.current?.showModal()}
      >
        {label}
      </button>
      <dialog
        aria-label={title}
        ref={ref}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border-0 p-7 text-ink shadow-2xl backdrop:bg-ink/45"
      >
        <button
          className="icon-button absolute right-4 top-4"
          aria-label="Close dialog"
          onClick={() => ref.current?.close()}
        >
          <X size={20} />
        </button>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-forest-soft text-forest">
          <Construction size={24} />
        </div>
        <h2 className="mb-3 text-xl font-bold">{title}</h2>
        <div className="text-sm leading-7 text-muted">{children}</div>
        <button
          className="primary-button mt-6 w-full"
          onClick={() => ref.current?.close()}
        >
          Got it
        </button>
      </dialog>
    </>
  );
}
