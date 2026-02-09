import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type PillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export default function Pill({
  active,
  className,
  children,
  ...props
}: PillProps) {
  return (
    <button
      className={clsx(
        "rounded-full border px-4 py-1.5 text-xs tracking-[0.2em] uppercase transition",
        active
          ? "border-white/80 bg-white/10 text-white"
          : "border-white/15 text-white/60 hover:border-white/60 hover:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
