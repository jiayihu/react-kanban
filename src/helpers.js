// @flow

/**
 * Checks if string is valid v4 id
 */
export function isV4(id: string): boolean {
  return /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(id);
}

export function makeError(data: mixed) {
  throw new Error(JSON.stringify(data));
}
