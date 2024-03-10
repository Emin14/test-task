export const removeDuplicates = (data) => {
  const results = [];
  data.forEach((item) => {
    const duplicate = results.find((result) => result.id === item.id);
    if (!duplicate) {
      results.push(item);
    }
  });
  return results;
};
