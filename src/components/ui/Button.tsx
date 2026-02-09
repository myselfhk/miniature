import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "ghost";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-paper text-ink shadow-none hover:shadow-[0_0_30px_-8px_rgba(0,255,247,0.4)] hover:bg-white active:scale-[0.98]",
  ghost:
    "border border-border text-paper hover:border-accent-cyan/50 hover:text-accent-cyan hover:bg-accent-cyan/5 active:scale-[0.98]",
};

export default function Button({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
