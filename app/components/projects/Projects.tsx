import { motion } from "framer-motion";
import styles from "./Projects.module.css";
import { useDataContext } from "../../context/DataContext";
import type { GitHubRepoItem } from "../../types";
import markdownit from 'markdown-it';
import anchor from 'markdown-it-anchor';
import taskLists from 'markdown-it-task-lists';
import attrs from 'markdown-it-attrs';
import parse from 'html-react-parser';  
import { DEFAULT_README, fetchReadme } from "~/utils/repo-util";
import { useEffect, useState } from "react";


function ProjectCard({ project }: { project: GitHubRepoItem }) {
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true
  })
  .use(anchor, {
    permalink: true,
    permalinkClass: 'header-anchor',
    permalinkSymbol: '#'
  })
  .use(taskLists, {
    enabled: true,
    label: true,
    labelAfter: true
  })
  .use(attrs);
  const [readme, setReadme] = useState<string>(DEFAULT_README);

  useEffect(() => {
    const loadReadme = async () => {
      const [owner, repo] = project.htmlUrl.replace('https://github.com/', '').split('/');
      const readmeContent = await fetchReadme(owner, repo);
      setReadme(readmeContent);
    };
    loadReadme();
  }, [project.htmlUrl]);
  
  return (
    <motion.div whileHover={{ scale: 1.05 }} className={styles.projectCard}>
      <div className={styles.readmeContainer}>
        {parse(md.render(readme))}
      </div>
      <div className={styles.projectDetails}>
        <h3 className={styles.projectTitle}>{project.name}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.projectTechnologies}>
          {project.topics.map((topic, index) => (
            <span key={index} className={styles.technologyTag}>
              {topic}
            </span>
          ))}
        </div>
        <div className={styles.projectLinks}>
          <a
            href={project.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            GitHub
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveDemoLink}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  const { data, isLoading, error } = useDataContext();
  const { githubRepos: githubReposData } = data || {};

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{`Failed to fetch services data: ${(error as Error).message}`}</p>;
  }

  return (
    <section className={styles.projectsSection} id="projects-section">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.projectsGrid}>
          {githubReposData?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
