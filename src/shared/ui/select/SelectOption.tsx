import { TSelectOption } from "shared/ui";
import style from "./SelectOption.module.scss";
import React, { useEffect, useRef } from "react";
import classNames from "classnames";

type Props<T> = {
  option: TSelectOption<T>;
  onClick: (value: T) => void;
  className?: string;
};

export const SelectOption = <T,>(props: Props<T>) => {
  const {
    option: { title, value, icon },
    onClick,
    className,
  } = props;
  const optionRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const optionElement = optionRef.current;
    if (!optionElement) return;

    const handleEnterPress = (event: KeyboardEvent) => {
      if (document.activeElement === optionElement && event.key === "Enter") {
        onClick(value);
      }
    };

    optionElement.addEventListener("keydown", handleEnterPress);

    return () => {
      optionElement.removeEventListener("keydown", handleEnterPress);
    };
  }, [value, onClick]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    onClick(value);
  };

  return (
    <li
      ref={optionRef}
      className={classNames(style.option, className)}
      value={value as string}
      onClick={handleClick}
      tabIndex={0}
    >
      {icon && <img className={style.icon} src={icon} alt={""} />}
      <span>{title}</span>
    </li>
  );
};
