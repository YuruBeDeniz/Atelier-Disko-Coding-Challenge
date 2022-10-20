import styles from "./header.module.css";
import typography from "../../styles/typography.module.css";
import layout from "../../styles/layout.module.css";
import cx from "classix";

function Header() {
  return (
    <header className={cx(styles.root, layout.container)}>
      <h1 className={typography.title400}>
        <strong>Atelier Disko</strong> Coding Challenge
      </h1>

      <h2 className={typography.title400}>Registration Form</h2>
    </header>
  );
}

export default Header;
