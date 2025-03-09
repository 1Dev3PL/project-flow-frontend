import { ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createContainer } from "shared/ui/portal/createContainer.ts";

type Props = {
  id: string;
  children: ReactNode;
};

export const Portal = (props: Props) => {
  const { id, children } = props;
  const [container, setContainer] = useState<HTMLElement>();

  useLayoutEffect(() => {
    let isCreated = false;

    if (id) {
      let portalContainer = document.getElementById(id);

      if (!portalContainer) {
        portalContainer = createContainer({ id });
        isCreated = true;
      }

      setContainer(portalContainer);
    }

    return () => {
      if (isCreated) {
        document.getElementById(id)?.remove();
      }
    };
  }, [id]);

  return container ? createPortal(children, container) : null;
};
