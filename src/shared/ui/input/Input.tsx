import classNames from "classnames";
import style from "./Input.module.scss";
import React, { ChangeEvent, ReactElement, Ref, useId } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent) => void;
  label?: string;
  type?: string;
  error?: string;
} & ReturnType<UseFormRegister<T>>;

const InputWithRef = <T extends FieldValues>(
  props: Omit<Props<T>, "ref">,
  ref: Ref<HTMLInputElement>,
) => {
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
        aria-invalid={error ? "true" : "false"}
      />
      {error && <p className={style.validation_message}>{error}</p>}
    </div>
  );
};

export const Input = React.forwardRef(InputWithRef) as <T extends FieldValues>(
  props: Props<T> & {
    ref?: Ref<HTMLInputElement>;
  },
) => ReactElement;
