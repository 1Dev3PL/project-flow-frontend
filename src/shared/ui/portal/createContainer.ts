type containerOptions = { id: string; mountNode?: HTMLElement };

export const createContainer = (options: containerOptions): HTMLElement => {
  if (document.getElementById(options.id)) {
    return document.getElementById(options.id)!;
  }

  const { id, mountNode = document.body } = options;

  const portalContainer = document.createElement("div");

  portalContainer.setAttribute("id", id);
  mountNode.appendChild(portalContainer);

  return portalContainer;
};
