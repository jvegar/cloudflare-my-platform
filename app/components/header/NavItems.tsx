import styles from "./Header.module.css";
import { Link as RouterLink, useLocation } from "react-router";
import { useEffect } from "react";

interface NavItemProps {
  href: string;
  text: string;
  isActive: boolean;
  onClick: (href: string) => void;
}

function NavItem({ href, text, isActive, onClick }: NavItemProps) {
  const isPlatformLink = href === "#my-platform-section";

  return (
    <li className={styles.headerNavItem}>
      {isPlatformLink ? (
        <RouterLink
          to="/platform"
          className={`${styles.headerNavLink} ${
            isActive ? styles.headerNavLinkActive : ""
          }`}
          onClick={() => onClick(href)}
        >
          <span>{text}</span>
        </RouterLink>
      ) : (
        <RouterLink
          to={{ pathname: "/", hash: href }}
          className={`${styles.headerNavLink} ${
            isActive ? styles.headerNavLinkActive : ""
          }`}
          onClick={() => onClick(href)}
        >
          <span>{text}</span>
        </RouterLink>
      )}
    </li>
  );
}

interface NavItemsProps {
  activeLink: string;
  onLinkClick: (href: string) => void;
}

function NavItems({ activeLink, onLinkClick }: NavItemsProps) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const items = [
    { href: "#home-section", text: "Home" },
    { href: "#about-section", text: "About me" },
    { href: "#resume-section", text: "Resume" },
    { href: "#services-section", text: "Services" },
    { href: "#projects-section", text: "Projects" },
    { href: "#contact-section", text: "Contact" },
    { href: "#my-platform-section", text: "My Platform" },
  ];

  return (
    <ul className={styles.headerNavList}>
      {items.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          text={item.text}
          isActive={activeLink === item.href}
          onClick={onLinkClick}
        />
      ))}
    </ul>
  );
}

export default NavItems;
