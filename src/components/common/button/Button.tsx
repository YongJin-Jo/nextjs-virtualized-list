import { ButtonHTMLAttributes, Ref } from "react";
import * as styles from "./Button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  ref?: Ref<HTMLButtonElement>;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  const classNames = [
    styles.base,
    styles.variants[variant],
    styles.sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button ref={ref} className={classNames} {...props}>
      {children}
    </button>
  );
}
