export type PropsType<T extends Record<string | symbol, string>> = T[keyof T];

export type Source = Record<string | symbol, any>;
export type FlattenKeys<T extends Source, Key = keyof T> = Key extends string
  ? T[Key] extends Source
    ? `${Key}.${FlattenKeys<T[Key]>}`
    : `${Key}`
  : never;

export type SourceKey<T extends Source> = FlattenKeys<T>;
