export function isValidURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidCustomCode(code: string) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}
