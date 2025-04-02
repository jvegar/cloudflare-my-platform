import type {
  EducationItem,
  ExperienceItem,
  GitHubRepoItem,
  PersonalInfoItem,
  ServiceItem,
  SkillItem,
  TechStackItem,
} from '.';

export interface DataContextType {
  data:
    | {
        personalInfo: PersonalInfoItem;
        techStack: TechStackItem[];
        education: EducationItem[];
        experience: ExperienceItem[];
        skills: SkillItem[];
        services: ServiceItem[];
        githubRepos: GitHubRepoItem[];
      }
    | undefined;
  error: unknown;
  isLoading: boolean;
}
