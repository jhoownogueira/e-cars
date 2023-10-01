export function maskDecimalNumber(value: string) {
  value = value.replace(/,/g, ".");
  value = value.replace(/[^0-9.]/g, "");
  value = value.replace(/(\..*?)\./g, "$1");
  value = value.replace(/(\.\d{2})./g, "$1");
  return value;
}
