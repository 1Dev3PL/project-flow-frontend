import classNames from "classnames";
import style from "./TextArea.module.scss";
import React, { ChangeEvent, ReactElement, Ref, useId } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  register?: ReturnType<UseFormRegister<T>>;
};

const TextAreaWithRef = <T extends FieldValues>(
  props: Omit<Props<T>, "ref">,
  ref: Ref<HTMLTextAreaElement>,
) => {
  const {
    className,
    placeholder,
    value,
    onChange,
    label,
    error,
    register,
    onBlur,
  } = props;
  const inputId = useId();

  return (
    <div className={classNames(style.textarea_container, className)}>
      {label && (
        <label htmlFor={inputId} className={style.label}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={classNames(style.textarea, {
          [style.textarea_error]: error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={inputId}
        aria-invalid={error ? "true" : "false"}
        {...register}
      />
      <div className={style.validation_wrapper}>
        {error && <p className={style.validation_message}>{error}</p>}
      </div>
    </div>
  );
};

export const TextArea = React.forwardRef(TextAreaWithRef) as <
  T extends FieldValues,
>(
  props: Props<T> & {
    ref?: Ref<HTMLInputElement>;
  },
) => ReactElement;
