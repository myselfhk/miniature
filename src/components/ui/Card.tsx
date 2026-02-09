import type { HTMLAttributes } from "react";
import clsx from "clsx";

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
