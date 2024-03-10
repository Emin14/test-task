export function clearingProperties(obj) {
  const newObj = {};
  for (const key in obj) {
    newObj[key] = "";
  }
  return newObj;
}
