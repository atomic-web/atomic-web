const isOverflowParent = (element: HTMLElement) => {
  const style = getComputedStyle(element);
  return [
    style.getPropertyValue('overflow'),
    style.getPropertyValue('overflow-x'),
    style.getPropertyValue('overflow-y'),
  ].some((p) => !p || (p && /((scroll|auto))/g.test(p)));
};

export const getScrollParent = (element: HTMLElement) => {
  if (!(element instanceof HTMLElement)) {
    return window;
  }

  let parent: Node | null = element;

  while (parent) {
    if (!(parent instanceof HTMLElement)) {
      break;
    }

    if (isOverflowParent(parent)) return parent;

    parent = parent.parentNode;
  }

  return window;
};
