const o = (query: string): NodeListOf<Element> | Element | null => {
  const elements = document.querySelectorAll(query);
  if (!elements.length) {
    return null;
  } else if (elements.length === 1) {
    return elements[0];
  } else {
    return elements;
  }
};

o.make = (html: string): null | HTMLCollection | Element | Element[] => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const elements = div.children;
  if (!elements.length) {
    return null;
  } else if (elements.length === 1) {
    return elements[0];
  } else {
    return Array.from(elements);
  }
};

o.create = (tag: keyof HTMLElementTagNameMap, options: ElementCreationOptions) =>
  document.createElement(tag, options);

o.css = (element: HTMLElement, styles: CSSStyleDeclaration) => {
  if (typeof styles === 'object' && !!element) {
    Object.keys(styles).forEach(rule => {
      if (Array.isArray(element)) {
        element.forEach(el => {
          (el.style[rule as keyof CSSStyleDeclaration] as any) = styles[
            rule as keyof CSSStyleDeclaration
          ] as any;
        });
      } else {
        (element.style[rule as keyof CSSStyleDeclaration] as any) = styles[
          rule as keyof CSSStyleDeclaration
        ] as any;
      }
    });
  }
  return element;
};

o.sanitize = (str: string) => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

o.body = document.querySelector('body');

if (window) {
  Object.defineProperty(window, 'o', { value: o });
}

export default o;
