import classNames from "classnames";
import style from "./Input.module.scss";
import React, { ChangeEvent, useId } from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent) => void;
  label?: string;
  type?: string;
  error?: string;
} & ReturnType<UseFormRegister<never>>;

export const Input = React.forwardRef((props: Props, ref) => {
  const {
    className,
    placeholder,
    value,
    onChange,
    label,
    type = "text",
    error,
    ...rest
  } = props;
  const inputId = useId();

  return (
    <div className={classNames(style.input_container, className)}>
      <label htmlFor={inputId} className={style.label}>
        {label}
      </label>
      <input
        {...rest}
        ref={ref}
        type={type}
        className={style.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={inputId}
      />
      {error && <p className={style.validation_message}>{error}</p>}
    </div>
  );
});
