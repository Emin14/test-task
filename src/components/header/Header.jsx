import logo from "../../assets/logo.svg";
import { useDispatch } from "react-redux";
import { changeCurrentPage } from "../../redux/slices/currentPageSlice";
import { clearParams } from "../../redux/slices/paramsSlice";
import styles from "./header.module.css";

export default function Header() {

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(clearParams());
    dispatch(changeCurrentPage(1));
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img  className={styles.logo} src={logo} alt="" onClick={handleClick}/>
        <ul className={styles.list}>
          <li>Каталог</li>
          <li>Займ</li>
          <li>Скупка</li>
          <li>Тарифы</li>
          <li>Комиссионный</li>
          <li>Хранение шуб</li>
          <li>Контакты</li>
        </ul>
      </div>
    </header>
  );
}
