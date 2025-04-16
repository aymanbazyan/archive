// antd-alt-components.jsx
import styles from "./antd-alt-for-caching.module.scss";

export function Btn({
  children,
  type = "default",
  size = "middle",
  disabled = false,
  onClick,
  className = "",
  icon,
  shape,
  title,
  ...props
}) {
  const btnClass = `${styles["alt-btn"]} ${styles[`alt-btn-${type}`]} ${
    styles[`alt-btn-${size}`]
  } ${disabled ? styles["alt-btn-disabled"] : ""} ${
    shape === "circle" ? styles["alt-btn-circle"] : ""
  } ${icon && !children ? styles["alt-btn-icon-only"] : ""} ${className}`;

  return (
    <button
      className={btnClass}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      title={title}
      {...props}
    >
      {icon && <span className={styles["alt-btn-icon"]}>{icon}</span>}
      {children}
    </button>
  );
}

export function Card({
  children,
  title,
  variant = "default",
  bordered = true,
  className = "",
  ...props
}) {
  const cardClass = `${styles["alt-card"]} ${styles[`alt-card-${variant}`]} ${
    bordered ? styles["alt-card-bordered"] : ""
  } ${className}`;

  return (
    <div className={cardClass} {...props}>
      {title && (
        <div className={styles["alt-card-head"]}>
          <div className={styles["alt-card-head-title"]}>{title}</div>
        </div>
      )}
      <div className={styles["alt-card-body"]}>{children}</div>
    </div>
  );
}

// export function Divider({
//   type = "horizontal",
//   orientation = "center",
//   className = "",
//   ...props
// }) {
//   const dividerClass = `${styles["alt-divider"]} ${
//     styles[`alt-divider-${type}`]
//   } ${styles[`alt-divider-${orientation}`]} ${className}`;

//   return <div className={dividerClass} {...props} />;
// }
