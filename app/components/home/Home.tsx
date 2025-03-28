import Hero from "./Hero/Hero";
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.home} id="home-section">
      <div className={styles.homeContainer}>
        <Hero />
      </div>
    </section>
  );
}

export default Home;
