/** @format */
export const KEY_ACCESS_TOKEN = "access_token";
export function getItem(key) {
  return localStorage.getItem(key);
}
export function setItem(key, val) {
  localStorage.setItem(key, val);
}
export function removeItem(key) {
  localStorage.removeItem(key);
}
