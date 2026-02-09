import type { ElementType, HTMLAttributes } from "react";
import clsx from "clsx";

type HeadingProps<T extends ElementType> = {
  as?: T;
  size?: "xl" | "lg" | "md" | "sm";
} & HTMLAttributes<HTMLElement>;

const sizeStyles = {
  xl: "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
  lg: "text-3xl sm:text-4xl font-semibold tracking-tight",
  md: "text-2xl sm:text-3xl font-semibold tracking-tight",
  sm: "text-xl font-semibold tracking-tight",
};

export default function Heading<T extends ElementType = "h2">({
  as,
  size = "lg",
  className,
  ...props
}: HeadingProps<T>) {
  const Component = as || "h2";
  return (
    <Component
      className={clsx("text-balance", sizeStyles[size], className)}
      {...props}
    />
  );
}
