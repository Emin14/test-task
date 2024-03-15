export const convertingToArrayPages = (total, limit) => {
  const count = Math.ceil(total / limit);
  const result = [];
  for (let i = 1; i <= count; i++) {
    result.push(i);
  }
  return result;
};
