export type PropsType<T extends Record<string | symbol, string>> = T[keyof T];
