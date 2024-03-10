import styles from "./spinner.module.css";

export default function Spinner({ isLoading }) {
  return (
    <div className={isLoading ? styles.loaderContainer : styles.novisible}>
      <div className={styles.spinner} />
    </div>
  );
}
