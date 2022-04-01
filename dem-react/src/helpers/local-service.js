export function setValue(key, value) {
  localStorage.setItem(key, value);
}
export function getValue(key) {
  const cat = localStorage.getItem(key);
  return cat;
}
export function removeValue(key) {
  localStorage.removeItem(key);
}
export function clearAllValues() {
  localStorage.clear();
}
export function getAuthToken() {
  return getValue("auth_token");
}
export function setAuthToken(value) {
  return setValue("auth_token", value);
}
