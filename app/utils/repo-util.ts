export const DEFAULT_README = '# Hello, *World*!';

export const checkRateLimit = (response: Response) => {
  const remaining = response.headers.get('x-ratelimit-remaining');
  const reset = response.headers.get('x-ratelimit-reset');
  
  if (remaining && parseInt(remaining) < 10) {
    const resetDate = reset ? new Date(parseInt(reset) * 1000) : new Date();
    console.warn(`GitHub API rate limit low: ${remaining} requests remaining. Resets at ${resetDate.toLocaleString()}`);
  }
};

export const getDefaultBranch = async (owner: string, repo: string): Promise<string> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    checkRateLimit(response);
    
    if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') {
      throw new Error('GitHub API rate limit exceeded');
    }
    
    if (!response.ok) {
      throw new Error(`Repository not found: ${response.status} ${response.statusText}`);
    }
    
    const data: any = await response.json();
    return data.default_branch;
  } catch (error) {
    console.warn(`Failed to fetch repository info for ${repo}:`, error);
    return 'main'; // Fallback to 'main' if we can't get the default branch
  }
};

export const fetchReadme = async (owner: string, repo: string): Promise<string> => {
  try {
    const defaultBranch = await getDefaultBranch(owner, repo);
    const response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/README.md`);
    if (!response.ok) {
      throw new Error('README not found');
    }
    return await response.text();
  } catch (error) {
    console.warn(`Failed to fetch README for ${repo}:`, error);
    return DEFAULT_README;
  }
};