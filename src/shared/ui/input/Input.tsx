import classNames from "classnames";
import style from "./Input.module.scss";
import React, {
  ChangeEvent,
  ReactElement,
  Ref,
  useId,
  useState,
} from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import eyeIcon from "shared/assets/icons/eye.svg";
import eyeOffIcon from "shared/assets/icons/eyeOff.svg";

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
  const [visibility, setVisibility] = useState(type);

  const visibilityIcon = visibility == "password" ? eyeOffIcon : eyeIcon;
  const inputType = type == "password" ? visibility : type;

  const toggleVisibility = () => {
    setVisibility(visibility == "password" ? "text" : "password");
  };

  return (
    <div className={classNames(style.wrapper, className)}>
      {label && (
        <label htmlFor={inputId} className={style.label}>
          {label}
        </label>
      )}
      <div className={style.input_container}>
        <input
          ref={ref}
          type={inputType}
          className={style.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          id={inputId}
          aria-invalid={error ? "true" : "false"}
          {...register}
        />
        {type === "password" && (
          <span className={style.visibility_toggle} onClick={toggleVisibility}>
          <img src={visibilityIcon} alt={""} />
        </span>
        )}
      </div>
      {error && <p className={style.validation_message}>{error}</p>}
    </div>
  );
};

export const Input = React.forwardRef(InputWithRef) as <T extends FieldValues>(
  props: Props<T> & {
    ref?: Ref<HTMLInputElement>;
  },
) => ReactElement;
