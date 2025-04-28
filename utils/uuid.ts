const guidSpace: { [namespace: string]: number } = {};
export function uniqueId(ns = ''): string {
  if (guidSpace[ns] === undefined) {
    guidSpace[ns] = 0;
  }
  return `${ns}${nanoid()}`;
}

const numberAlphabet = '0123456789';
const letterAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
const alphabet = numberAlphabet + letterAlphabet;

export function nanoid(size = 8): string {
  let id = '';

  const bytes = crypto.getRandomValues(new Uint8Array(size));

  id += letterAlphabet[bytes[0] & (letterAlphabet.length - 1)];
  size--;

  while (size--) {
    // Using the bitwise AND operator to "cap" the value of
    // the random byte from 255 to 63, in that way we can make sure
    // that the value will be a valid index for the "chars" string.

    id += alphabet[bytes[size] & (alphabet.length - 1)];
  }
  return id;
}

export function uuid(prefix = ''): string {
  // crypto.randomUUID in the browser environment must be used on localhost and https,
  // so  need to determine whether this method exists
  return `${prefix}${nanoid()}`;
}
