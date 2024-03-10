import styles from "./catalog.module.css";

export default function Catalog({ products }) {
  return (
    products && (
      <div className={styles.catalog}>
        {products.map((product) => (
          <div key={product.id + product.price} className={styles.block}>
            <p className={styles.title}>{product.product}</p>
            <p className={styles.price}>{product.price}₽</p>
            <p>{product.brand ? `brand: ${product.brand}` : ""}</p>
            <p className={styles.id}>id: {product.id}</p>
          </div>
        ))}
      </div>
    )
  );
}
