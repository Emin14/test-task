import { useDispatch } from "react-redux";
import { changeCurrentPage } from "../../redux/slices/currentPageSlice";
import styles from "./pagination.module.css";

export default function Pagination({ pages, currentPage, isLoading }) {
  const dispatch = useDispatch();

  if (pages && !isLoading) {
    return (
      <div className={styles.pagination}>
        {pages &&
          pages.map((page) =>
            (page > currentPage - 3 && page < currentPage + 3) ||
            page === pages[0] ||
            page === pages.length ? (
              <span
                key={page}
                className={
                  currentPage === page
                    ? [styles.active, styles.page].join(" ")
                    : styles.page
                }
                onClick={() => dispatch(changeCurrentPage(page))}
              >
                {page}
              </span>
            ) : "" )}
      </div>
    );
  }
}
