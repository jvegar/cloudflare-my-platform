import styles from './About.module.css';
import aboutImage from '../../assets/about.jpg';
import Stack from './Stack/Stack';
import { useEffect, useState } from 'react';
import { useScrollSpyContext } from '../header/scrollSpyContext';
import { useDataContext } from '../../context/DataContext';

function About() {
  const [counter, setCounter] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const { activeSection } = useScrollSpyContext();

  const { data, isLoading, error } = useDataContext();
  const { personalInfo: aboutData } = data || {};

  useEffect(() => {
    setCounter(0);
    setIsCounting(activeSection === 'about-section');
  }, [activeSection]);

  useEffect(() => {
    if (isCounting) {
      const intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [isCounting]);

  useEffect(() => {
    if (aboutData && counter >= aboutData.projectsCount) {
      setIsCounting(false);
    }
  }, [counter, aboutData]);

  if (error) return 'An error has occurred: ' + (error as Error).message;

  return (
    <section className={styles.about} id="about-section">
      <div className={styles.aboutContainer}>
        <div className={styles.aboutRow}>
          <div className={styles.aboutImageColumn}>
            <div className={styles.aboutImageWrapper}>
              <div className={styles.aboutImageOverlay}></div>
              <img src={aboutImage} alt="About" className={styles.aboutImage} />
            </div>
          </div>
          <div className={styles.aboutContentColumn}>
            <div className={styles.aboutContentWrapper}>
              <div className={styles.aboutHeading}>
                <h2 className={styles.aboutHeadingMedium}>About me</h2>
                <p className={styles.aboutDescription}>
                  {!isLoading ? aboutData?.description : 'Loading...'}
                </p>
                <ul className={styles.aboutInfoList}>
                  <li className={styles.aboutInfoItem}>
                    <span className={styles.aboutInfoLabel}>Name:</span>
                    <span className={styles.aboutInfoValue}>
                      {!isLoading ? aboutData?.name : 'Loading...'}
                    </span>
                  </li>
                  <li className={styles.aboutInfoItem}>
                    <span className={styles.aboutInfoLabel}>Email:</span>
                    <span className={styles.aboutInfoValue}>
                      {!isLoading ? aboutData?.email : 'Loading...'}
                    </span>
                  </li>
                  <li className={styles.aboutInfoItem}>
                    <span className={styles.aboutInfoLabel}>Phone: </span>
                    <span className={styles.aboutInfoValue}>
                      {!isLoading ? aboutData?.phone : 'Loading...'}
                    </span>
                  </li>
                </ul>
              </div>
              <div className={styles.aboutCounter}>
                <div className={styles.aboutCounterText}>
                  <p className={styles.aboutCounterProjects}>
                    <span className={styles.aboutCounterNumber} data-number={counter}>
                      {counter}
                    </span>
                    <span className={styles.aboutCounterLabel}>Projects</span>
                  </p>
                  <p className={styles.aboutCounterCta}>
                    <a href="#" className={styles.aboutDownloadButton}>
                      Download Resume
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Stack />
      </div>
    </section>
  );
}

export default About;
