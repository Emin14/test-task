import styles from "./header.module.css";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={logo} alt="" />
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
