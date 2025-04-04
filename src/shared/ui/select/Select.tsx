import { useEffect, useMemo, useRef, useState } from "react";
import style from "./Select.module.scss";
import arrowDown from "shared/assets/icons/arrowDown.svg";
import { TSelectOption } from "shared/ui";
import { SelectOption } from "shared/ui/select/SelectOption.tsx";
import classNames from "classnames";

type Props<T> = {
  selected?: T;
  options: TSelectOption<T>[];
  placeholder?: string;
  onChange?: (selected: T) => void;
  className?: string;
};

export const Select = <T,>(props: Props<T>) => {
  const { options, placeholder, selected, onChange, className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  useEffect(() => {
    const selectorEl = selectorRef.current;
    if (!selectorEl) return;

    const handleEnterPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsOpen((prev) => !prev);
      }
    };

    selectorEl.addEventListener("keydown", handleEnterPress);

    return () => {
      selectorEl.removeEventListener("keydown", handleEnterPress);
    };
  }, []);

  const handleOptionClick = (value: T) => {
    setIsOpen(false);
    if (value != selected) {
      onChange?.(value);
    }
  };
  const handleSelectorClick = () => {
    setIsOpen((prev) => !prev);
  };

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selected),
    [options, selected],
  );

  return (
    <div
      className={classNames(style.selector_container, className)}
      ref={rootRef}
    >
      <div
        ref={selectorRef}
        className={classNames(style.selector, {
          [style.selector_open]: isOpen,
        })}
        onClick={handleSelectorClick}
        role="button"
        tabIndex={0}
      >
        <div className={style.selected_option}>
          {selectedOption?.icon && (
            <img className={style.icon} src={selectedOption?.icon} alt={""} />
          )}
          <span>{selectedOption?.title || placeholder}</span>
        </div>
        <div
          className={classNames(style.arrow, {
            [style.arrow_open]: isOpen,
          })}
        >
          <img src={arrowDown} alt={""} />
        </div>
      </div>
      {isOpen && (
        <ul className={style.options}>
          {options.map((option) => (
            <SelectOption
              key={option.value as string}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
