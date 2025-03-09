import classNames from "classnames";
import style from "./Input.module.scss";
import React, { ChangeEvent, ReactElement, Ref, useId } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  register?: ReturnType<UseFormRegister<T>>;
};

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
    register,
    onBlur,
  } = props;
  const inputId = useId();

  return (
    <div className={classNames(style.input_container, className)}>
      {label && (
        <label htmlFor={inputId} className={style.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={style.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={inputId}
        aria-invalid={error ? "true" : "false"}
        {...register}
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
