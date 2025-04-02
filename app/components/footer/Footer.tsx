import styles from './Footer.module.css';
import twitterIcon from '../../assets/icon-twitter.svg';
import facebookIcon from '../../assets/icon-facebook.svg';
import instagramIcon from '../../assets/icon-instagram.svg';
import locationIcon from '../../assets/icon-location.svg';
import phoneIcon from '../../assets/icon-phone.svg';
import emailIcon from '../../assets/icon-email.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>About me</h3>
          <p>This is my personal website where you can learn a little more about me.</p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.iconTwitter}>
              <img src={twitterIcon} alt="Twitter" width={32} height={32} />
            </a>
            <a href="#" className={styles.iconFacebook}>
              <img src={facebookIcon} alt="Facebook" width={32} height={32} />
            </a>
            <a href="#" className={styles.iconInstagram}>
              <img src={instagramIcon} alt="Instagram" width={32} height={32} />
            </a>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h3>Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About me</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Services</h3>
          <ul>
            <li>Web Design</li>
            <li>Web Development</li>
            <li>Financial Advisory</li>
            <li>Data Analysis</li>
            <li>Graphic Design</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Have questions?</h3>
          <ul className={styles.footerList}>
            <li className={styles.footerItem}>
              <span className={styles.iconLocation}>
                <img src={locationIcon} alt="Location" width={32} height={32} />
              </span>{' '}
              <span className={styles.footerItemText}>Lima, Perú</span>
            </li>
            <li className={styles.footerItem}>
              <span className={styles.iconPhone}>
                <img src={phoneIcon} alt="Phone" width={32} height={32} />
              </span>{' '}
              <span className={styles.footerItemText}>+51 991139451</span>
            </li>
            <li className={styles.footerItem}>
              <span className={styles.iconEmail}>
                <img src={emailIcon} alt="Email" width={32} height={32} />
              </span>{' '}
              <span className={styles.footerItemText}>jvegar@uni.pe</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>Copyright © 2024 All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
