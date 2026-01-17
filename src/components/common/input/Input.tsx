import { InputHTMLAttributes, Ref } from "react";
import * as styles from "./Input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "outlined" | "filled";
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export default function Input({
  variant = "default",
  inputSize = "md",
  error = false,
  className,
  ref,
  ...props
}: InputProps) {
  const classNames = [
    styles.base,
    styles.variants[variant],
    styles.sizes[inputSize],
    error && styles.error,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <input ref={ref} className={classNames} {...props} />;
}
