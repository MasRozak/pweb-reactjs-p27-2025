// src/components/Button.tsx
import { type ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner} />
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
