import { TSelectOption } from "shared/ui";
import style from "./SelectOption.module.scss";
import React, { useEffect, useRef } from "react";

type Props<T> = {
  option: TSelectOption<T>;
  onClick: (value: T) => void;
};

export const SelectOption = <T,>(props: Props<T>) => {
  const {
    option: { title, value, icon },
    onClick,
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
      className={style.option}
      value={value as string}
      onClick={handleClick}
      tabIndex={0}
    >
      {icon && <img className={style.icon} src={icon} alt={""} />}
      <span>{title}</span>
    </li>
  );
};
