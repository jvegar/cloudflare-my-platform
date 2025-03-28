import { useState } from "react";
import { useScrollPosition } from "./useScrollPosition";
import styles from "./Header.module.css";
import NavItems from "./NavItems";
import { useScrollSpyContext } from "./scrollSpyContext";
import { useLocation, Link } from "react-router";

function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const isScrolled = useScrollPosition();

  const { activeSection } = useScrollSpyContext();

  const location = useLocation();
  const isPlatformRoute = location.pathname.startsWith("/platform");

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleLinkClick = () => {
    setIsNavVisible(false);
    if (!isPlatformRoute) {
      setTimeout(() => {
        const headerHeight =
          document.getElementById("header")?.offsetHeight || 0;
        const currentPosition = window.scrollY;
        window.scrollTo({
          top: currentPosition - headerHeight,
          behavior: "smooth",
        });
      }, 500);
    }
  };

  return (
    <nav
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""} ${
        isPlatformRoute ? styles.headerPlatform : ""
      }`}
      id="header"
    >
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.headerBrand}>
          <span className={styles.headerBrandHighlight}>J</span>ose Eduardo
        </Link>
        <button
          className={styles.headerToggle}
          type="button"
          onClick={toggleNav}
          aria-expanded={isNavVisible}
          aria-label="Toggle navigation"
        >
          <span
            className={`${styles.headerToggleIcon} ${
              isNavVisible ? styles.open : ""
            }`}
          ></span>
        </button>

        <div
          className={`${styles.headerNav} ${isNavVisible ? styles.show : ""}`}
          id="header-nav"
        >
          <NavItems
            activeLink={`#${activeSection}`}
            onLinkClick={handleLinkClick}
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
