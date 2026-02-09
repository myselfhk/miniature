import type { HTMLAttributes } from "react";
import clsx from "clsx";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export default function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10",
        className,
      )}
      {...props}
    />
  );
}
