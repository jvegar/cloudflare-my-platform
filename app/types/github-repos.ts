export interface GitHubRepoItem {
    id: number;
    name: string;
    description: string;
    topics: string[];
    language: string;
    htmlUrl: string;
    liveUrl?: string;
    image?: string;
    readme?: string;
  }