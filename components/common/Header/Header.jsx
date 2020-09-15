import styles from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.headerLogo}>DreamHouse.ai</a>
      </Link>
      <ul className={styles.headerNav}>
        <li>
          <Link href="#">
            <a>Our projects</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>The team</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>How it Works</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>Login</a>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
