import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };

export const createMockEvent = (
  type: string,
  properties: Record<string, any> = {},
) => {
  return new Event(type, properties);
};

export const waitForLoadingToFinish = async () => {
  return new Promise(resolve => setTimeout(resolve, 0));
};

export const expectElementToHaveClasses = (
  element: Element,
  classes: string[],
) => {
  return classes.every(className => element.classList.contains(className));
};

export const expectElementToHaveAttributes = (
  element: Element,
  attributes: Record<string, string>,
) => {
  return Object.entries(attributes).every(
    ([attr, value]) => element.getAttribute(attr) === value,
  );
};
