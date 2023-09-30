import * as fs from 'fs';

export const allowedNames = (names: string[], fileName: string) => {
  const allowed = names.find((n) => fileName.includes(n));
  if (allowed) return true;
  return false;
};
