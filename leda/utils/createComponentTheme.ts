export const createComponentTheme = <T extends {} = {}>(defaultTheme: T | {} = {}, globalTheme: Partial<T> = {}, themeProp: Partial<T> = {}): T => ({
  ...defaultTheme, ...globalTheme, ...themeProp,
} as T);
