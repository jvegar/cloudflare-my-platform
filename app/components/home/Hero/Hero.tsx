import { useState, useEffect, useCallback } from "react";
import styles from "./Hero.module.css";

function useTextRotation(
  toRotate: string[],
  typingSpeed: number,
  deletingSpeed: number,
  pausePeriod: number
) {
  const [text, setText] = useState("");
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      setTimeout(() => setIsDeleting(true), pausePeriod);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  }, [toRotate, pausePeriod, text, isDeleting, loopNum]);

  useEffect(() => {
    const ticker = setInterval(tick, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearInterval(ticker);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return text;
}

function Hero() {
  const rotatingText = useTextRotation(
    [
      "Software Engineer.",
      "FullStack Developer.",
      "Backend Developer.",
      "Financial Investor.",
    ],
    100,
    100,
    1000
  );

  return (
    <section className={styles.hero} id="hero-section">
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <span className={styles.heroSubheading}>Hi! I am</span>
        <h1 className={styles.heroTitle}>Jose Vega</h1>
        <h2 className={styles.heroSubtitle}>
          I'm a <span className={styles.heroRotatingText}>{rotatingText}</span>
        </h2>
      </div>
    </section>
  );
}

export default Hero;
