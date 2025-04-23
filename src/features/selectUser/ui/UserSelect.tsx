import { useEffect, useRef, useState } from "react";
import style from "./UserSelect.module.scss";
import arrowDown from "shared/assets/icons/arrowDown.svg";
import classNames from "classnames";
import { useUsers } from "entities/user";
import { useInView } from "react-intersection-observer";
import { CircularProgress } from "@mui/material";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";
import userIcon from "shared/assets/icons/avatar.svg";
import { User } from "shared/types";
import { SelectOption } from "shared/ui";

type Props = {
  selected?: User | null;
  onChange?: (user: User | null) => void;
  className?: string;
};

export const UserSelect = (props: Props) => {
  const { selected, onChange, className } = props;
  const projectId = useCurrentProjectStore((state) => state.currentProjectId)!;
  const { users, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useUsers(projectId);
  const { ref: loaderRef } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });
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

  const handleUserSelect = (user: User | null) => {
    setIsOpen(false);
    if (user?.id != selected?.id) {
      onChange?.(user);
    }
  };
  const handleSelectorClick = () => {
    setIsOpen((prev) => !prev);
  };

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
          {selected && <img className={style.icon} src={userIcon} alt={""} />}
          <span>{selected?.name || "Не выбран"}</span>
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
          <SelectOption
            key={"no-executor"}
            option={{
              title: "Не выбран",
              value: null,
            }}
            onClick={handleUserSelect}
          />
          {users?.map((user) => (
            <SelectOption
              key={user.id}
              option={{ title: user.name, value: user, icon: userIcon }}
              onClick={handleUserSelect}
            />
          ))}
          {hasNextPage && (
            <li ref={loaderRef} style={{ minHeight: "1px" }}>
              {isFetchingNextPage && (
                <div className={style.loader}>
                  <CircularProgress size={"1em"} color={"inherit"} />
                </div>
              )}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
