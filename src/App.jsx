import styles from "./app.module.css";
import Board from "./components/board/Board";
import Filters from "./components/filters/Filters";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Filters />
        <Board />
      </main>
    </>
  );
}

export default App;
