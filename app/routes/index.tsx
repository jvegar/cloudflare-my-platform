import type {
  PersonalInfoItem,
  TechStackItem,
  EducationItem,
  ExperienceItem,
  SkillItem,
  ServiceItem,
  GitHubRepoItem,
} from '~/types';
import Home from '~/components/home/Home';
import About from '~/components/about/About';
import { useLoaderData } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { DataContext } from '~/context/DataContext';
import Resume from '~/components/resume/Resume';
import Services from '~/components/services/Services';

export function meta() {
  return [
    { title: 'My Personal Website' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

const fetchAllData = async () => {
  const [personalInfo, techStack, education, experience, skills, services, githubRepos]: [
    PersonalInfoItem,
    TechStackItem[],
    EducationItem[],
    ExperienceItem[],
    SkillItem[],
    ServiceItem[],
    GitHubRepoItem[],
  ] = await Promise.all([
    fetch(`${import.meta.env.VITE_MY_PLATFORM_API_URL}/api/personal-info/1`).then(
      (res) => res.json() as Promise<PersonalInfoItem>
    ),
    fetch(`${import.meta.env.VITE_MY_PLATFORM_API_URL}/api/tech-stack`).then(
      (res) => res.json() as Promise<TechStackItem[]>
    ),
    fetch(`${import.meta.env.VITE_MY_PLATFORM_API_URL}/api/education`).then(
      (res) => res.json() as Promise<EducationItem[]>
    ),
    fetch(`${import.meta.env.VITE_MY_PLATFORM_API_URL}/api/experience`).then(
      (res) => res.json() as Promise<ExperienceItem[]>
    ),
    fetch(`${import.meta.env.VITE_MY_PLATFORM_API_URL}/api/skills`).then(
      (res) => res.json() as Promise<SkillItem[]>
    ),
    fetch(`${import.meta.env.VITE_MY_PLATFORM_API_URL}/api/services`).then(
      (res) => res.json() as Promise<ServiceItem[]>
    ),
    fetch(`${import.meta.env.VITE_MY_PLATFORM_API_URL}/api/github-repos`).then(
      (res) => res.json() as Promise<GitHubRepoItem[]>
    ),
  ]);
  const allData = {
    personalInfo,
    techStack,
    education,
    experience,
    skills,
    services,
    githubRepos,
  };
  return allData;
};

export async function loader() {
  const allData = await fetchAllData();
  return { allData };
}

function MainContent() {
  const { allData } = useLoaderData<typeof loader>();
  const { data, error, isLoading } = useQuery({
    queryKey: ['allData'],
    queryFn: () => fetchAllData(),
    initialData: allData,
  });

  return (
    <DataContext.Provider value={{ data, error, isLoading }}>
      <Home />
      <About />
      <Resume />
      <Services />
    </DataContext.Provider>
  );
}

export default function Index() {
  return <MainContent />;
}
