import { ReactNode, useEffect, useRef } from "react";
import { Portal } from "shared/ui";
import style from "./Drawer.module.scss";

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Right-side modal window
 *
 * Click handlers, that opens Drawer, or occur in Drawer, needs to call e.stopPropagation() for proper click handling
 */
export const Drawer = (props: Props) => {
  const { id, open, onClose, children } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBackdropClick = (event: MouseEvent) => {
      const { target } = event;

      if (
        target instanceof Node &&
        rootRef.current !== target &&
        !rootRef.current?.contains(target)
      ) {
        onClose();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("click", handleBackdropClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("click", handleBackdropClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  return open ? (
    <Portal id={id}>
      <div className={style.drawer} ref={rootRef}>
        {children}
      </div>
    </Portal>
  ) : null;
};
