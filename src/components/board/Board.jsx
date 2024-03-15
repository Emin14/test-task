import { useEffect } from "react";
import { useSelector } from "react-redux";
import Catalog from "../catalog/Catalog.jsx";
import Pagination from "../pagination/Pagination.jsx";
import { useGetIdsQuery } from "../../redux/api/idApi.js";
import { useGetProductsQuery } from "../../redux/api/productsApi.js";
import { convertingToArrayPages } from "../../utils/convertingToArrayPages.js";
import Spinner from "../spinner/Spinner.jsx";
import { useGetPagesQuery } from "../../redux/api/pagesApi.js";
import { limit } from "../../redux/constants.js";

export default function Board() {
  const currentPage = useSelector((state) => state.currentPage);
  const params = useSelector((state) => state.params);

  // Получаем количество всех элементов
  const {
    data: allIdLength,
    isError: isErrorPages,
    refetch: getPagesRefetch,
  } = useGetPagesQuery();

  useEffect(() => {
    if (isErrorPages) {
      getPagesRefetch()
    }
  }, [isErrorPages, getPagesRefetch]);

  // Получаем id элементов при фильтрации
  const {
    data: ids,
    isFetching: isFetchingGetId,
    isError: isErrorIds,
    refetch: getIdsRefetch,
  } = useGetIdsQuery({ currentPage, limit, params });

  useEffect(() => {
    if (isErrorIds) {
      getIdsRefetch()
    }
  }, [isErrorIds, getIdsRefetch]);

  const pages = convertingToArrayPages(
    params ? ids.length : allIdLength,
    limit,
  );

    // Получаем продукты на основе id
  const {
    data,
    isLoading,
    isFetching: isFetchingGetProducts,
    isError: isErrorProducts,
    refetch: getProductsRefetch,
  } = useGetProductsQuery(ids, {
    skip: !ids,
  });

  useEffect(() => {
    if (isErrorProducts) {
      getProductsRefetch()
    }
  }, [isErrorProducts, getProductsRefetch]);

  const productsArray = {};
  if (params) {
    for (let i = 0; i < data.length / limit; i++) {
      productsArray[i] = data.slice(i * limit, i * limit + limit);
    }
  }

  const products = productsArray[currentPage - 1] || data;
  const loading = isFetchingGetId || isFetchingGetProducts;

  return (
    <>
      <Spinner isLoading={loading} />
      <Catalog products={products} />
      <Pagination
        pages={pages}
        currentPage={currentPage}
        isLoading={isLoading}
      />
    </>
  );
}