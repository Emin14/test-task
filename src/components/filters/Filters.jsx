import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { translate } from "../../assets/translate";
import { useGetFieldQuery } from "../../redux/api/fieldApi";
import { useGetBrandsQuery } from "../../redux/api/brandsApi";
import { changeCurrentPage } from "../../redux/slices/currentPageSlice";
import { changeParams, clearParams } from "../../redux/slices/paramsSlice";
import { clearingProperties } from "../../utils/clearingProperties";
import styles from "./filters.module.css";

export default function Filters() {
  const [searchParams, setSearchParams] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const dispatch = useDispatch();

  const {
    data: properties,
    isError: isErrorFiels,
    refetch: getFieldRefetch,
  } = useGetFieldQuery();

  useEffect(() => {
    if (isErrorFiels) {
      getFieldRefetch();
    }
  }, [isErrorFiels, getFieldRefetch]);

  const {
    data: brands,
    isError: isErrorBrands,
    refetch: getBrandsRefetch,
  } = useGetBrandsQuery();

  useEffect(() => {
    if (isErrorBrands) {
      getBrandsRefetch();
    }
  }, [isErrorBrands, getBrandsRefetch]);

  function changeValue(e) {
    let { value } = e.target;
    const fieldTitle = e.target.name;
    if (fieldTitle === "price") value = Number(value);
    setSearchParams({ [fieldTitle]: value });
  }

  function search(e) {
    e.preventDefault();
    dispatch(changeCurrentPage(1));
    dispatch(changeParams(searchParams));
    setSearchParams(clearingProperties(searchParams));
    setIsOpen(false);
  }

  function clearSearch() {
    dispatch(clearParams());
    dispatch(changeCurrentPage(1));
    setSearchParams(clearingProperties(searchParams));
    setIsOpen(false);
  }

  const closeModal = (e) => {
    if (e.target.id === "modal" || e.target.id === "cross") {
      setIsOpen(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHover(!isHover);
  };

  if (properties && brands) {
    return (
      <>
        <div
          onClick={closeModal}
          className={
            isOpen ? [styles.openModal, styles.modal].join(" ") : styles.modal
          }
          id="modal"
        />
        <button className={styles.filterBtn} onClick={() => setIsOpen(!isOpen)}>
          Все фильтры
        </button>
        <div
          className={
            isOpen
              ? [styles.openFilter, styles.filter].join(" ")
              : styles.filter
          }
        >
          <div className={styles.header}>
            <h2>Фильтр</h2>
            <div
              onClick={closeModal}
              className={
                isHover
                  ? [styles.burger, styles.hover].join(" ")
                  : styles.burger
              }
              id="cross"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseEnter}
            >
              <span />
            </div>
          </div>
          <form className={styles.form} onSubmit={search}>
            {properties.map((item) => (
              <Fragment key={item}>
                <h2 className={styles.title}>{translate[item]}</h2>
                {item === "product" ? (
                  <input
                    className={styles.inputText}
                    type="text"
                    value={searchParams[item] || ""}
                    onChange={changeValue}
                    name={item}
                  />
                ) : (
                  ""
                )}
                {item === "price" ? (
                  <>
                    <input
                      type="range"
                      value={searchParams[item] || ""}
                      min="1"
                      max="999999"
                      id="range"
                      onChange={changeValue}
                      name={item}
                      step="10"
                    />
                    <input
                      type="number"
                      id="rangenumber"
                      min="0"
                      max="999999"
                      value={searchParams[item] || ""}
                      onChange={changeValue}
                      name={item}
                    />
                  </>
                ) : (
                  ""
                )}
                {item === "brand" ? (
                  <select
                    className={styles.select}
                    value={searchParams[item] || ""}
                    onChange={changeValue}
                    name={item}
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                ) : (
                  ""
                )}
              </Fragment>
            ))}
            <button className={styles.submit} type="submit">
              Применить
            </button>
            <button
              className={styles.resetButton}
              type="button"
              onClick={clearSearch}
            >
              очистить фильтр
            </button>
          </form>
        </div>
      </>
    );
  }
}
