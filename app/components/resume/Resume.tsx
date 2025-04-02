import React, { useState, useEffect } from 'react';
import styles from './Resume.module.css';
import educationIcon from '../../assets/icon-education.svg';
import experienceIcon from '../../assets/icon-experience.svg';
import { useDataContext } from '../../context/DataContext';

function Resume() {
  const { data, isLoading, error } = useDataContext();
  const [activeSection, setActiveSection] = useState('Education');
  const { education: educationData, experience: experienceData, skills: skillsData } = data || {};

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['Education', 'Experience', 'Skills'];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(`page-${section.toLowerCase()}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (item: string) => {
    setActiveSection(item);

    const targetElement = document.getElementById(`page-${item.toLowerCase()}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{(error as Error).message}</p>;
    }

    return (
      <>
        <div id="page-education" className={`${styles.resumePage} ${styles.resumePageEducation}`}>
          <h2 className={styles.resumeHeading}>Education</h2>
          {educationData?.map((item) => (
            <React.Fragment key={item.id}>
              <div className={`${styles.resumeItem} ${styles.resumeItemEducation}`}>
                <div className={styles.resumeItemIcon}>
                  <span className={`${styles.resumeIcon} ${styles.resumeIconIdeas}`}>
                    <img src={educationIcon} alt="Education" width={40} height={40} />
                  </span>
                </div>
                <div className={styles.resumeItemContent}>
                  <span className={styles.resumeItemDate}>{item.dateRange}</span>
                  <h2 className={styles.resumeItemTitle}>{item.title}</h2>
                  <span className={styles.resumeItemSubtitle}>{item.subtitle}</span>
                </div>
              </div>
              <hr className={styles.resumeSeparator} />
            </React.Fragment>
          ))}
        </div>
        <div id="page-experience" className={`${styles.resumePage} ${styles.resumePageExperience}`}>
          <h2 className={styles.resumeHeading}>Experience</h2>
          {experienceData?.map((item) => (
            <React.Fragment key={item.id}>
              <div className={`${styles.resumeItem} ${styles.resumeItemEducation}`}>
                <div className={styles.resumeItemIcon}>
                  <span className={`${styles.resumeIcon} ${styles.resumeIconIdeas}`}>
                    <img src={experienceIcon} alt="Experience" width={40} height={40} />
                  </span>
                </div>
                <div className={styles.resumeItemContent}>
                  <span className={styles.resumeItemDate}>{item.dateRange}</span>
                  <h2 className={styles.resumeItemTitle}>{item.title}</h2>
                  <span className={styles.resumeItemSubtitle}>{item.company}</span>
                </div>
              </div>
              <hr className={styles.resumeSeparator} />
            </React.Fragment>
          ))}
        </div>
        <div id="page-skills" className={`${styles.resumePage} ${styles.resumePageSkills}`}>
          <h2 className={styles.resumeHeading}>Skills</h2>
          <div className={styles.resumeSkillsGrid}>
            {skillsData
              ?.filter((skill) => skill.isMainSkill)
              .map((skill, index) => (
                <div key={index} className={styles.resumeSkillCard}>
                  <h3>{skill.name}</h3>
                  <div className={styles.resumeSkillCircle}>
                    <svg viewBox="0 0 36 36" className={styles.resumeSkillCircleSvg}>
                      <path
                        className={styles.resumeSkillCircleBg}
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={styles.resumeSkillCircleProgress}
                        strokeDasharray={`${skill.percentage}, 100`}
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.35" className={styles.resumeSkillPercentage}>
                        {skill.percentage}%
                      </text>
                    </svg>
                  </div>
                  <div className={styles.resumeSkillStats}>
                    <div className={styles.resumeSkillStat}>
                      <span className={styles.resumeSkillStatValue}>{skill.lastWeek}%</span>
                      <span className={styles.resumeSkillStatLabel}>Last week</span>
                    </div>
                    <div className={styles.resumeSkillStat}>
                      <span className={styles.resumeSkillStatValue}>{skill.lastMonth}%</span>
                      <span className={styles.resumeSkillStatLabel}>Last month</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.resumeAdditionalSkills}>
            {skillsData
              ?.filter((skill) => !skill.isMainSkill)
              .map((skill, index) => (
                <div key={index} className={styles.resumeSkillBar}>
                  <div className={styles.resumeSkillBarInfo}>
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className={styles.resumeSkillBarBg}>
                    <div
                      className={styles.resumeSkillBarProgress}
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <section className={`${styles.resume} ${styles.resumeSection}`} id="resume-section">
      <div className={styles.resumeContainer}>
        <div className={styles.resumeRow}>
          <div className={styles.resumeNavColumn}>
            <nav className={styles.resumeNav} id="navi">
              <ul className={styles.resumeNavList}>
                {['Education', 'Experience', 'Skills'].map((item) => (
                  <li key={item} className={styles.resumeNavItem}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className={`${styles.resumeNavLink} ${
                        activeSection === item ? styles.resumeNavLinkActive : ''
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <span className={styles.resumeNavText}>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={styles.resumeContentColumn}>{renderContent()}</div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
