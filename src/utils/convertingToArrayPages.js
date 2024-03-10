// Функция для получения массива с количеством страниц, если на странице limit продуктов
export const convertingToArrayPages = (total, limit) => {
  const count = Math.ceil(total / limit);
  const result = [];
  for (let i = 1; i <= count; i++) {
    result.push(i);
  }
  return result;
};
