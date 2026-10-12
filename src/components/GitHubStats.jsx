import { useState, useEffect } from 'react';
import { FiGithub, FiStar, FiGitBranch, FiGitPullRequest } from 'react-icons/fi';
import fallbackProfile from '../data/githubProfile.json';

export default function GitHubStats({ username = 'sakshisingh62' }) {
  const [stats, setStats] = useState({
    repos: fallbackProfile.public_repos,
    followers: fallbackProfile.followers,
    following: fallbackProfile.following,
    stars: fallbackProfile.totalStars,
    forks: 0,
    mergedPRs: fallbackProfile.merged_prs,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [userRes, reposRes, prsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`).catch(() => null),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`).catch(() => null),
          fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`).catch(() => null)
        ]);

        const userData = userRes && userRes.ok ? await userRes.json() : null;
        const reposData = reposRes && reposRes.ok ? await reposRes.json() : [];
        const prsData = prsRes && prsRes.ok ? await prsRes.json() : null;

        if (userData || (prsData && typeof prsData.total_count === 'number')) {
          const totalStars = Array.isArray(reposData)
            ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
            : fallbackProfile.totalStars;
          const totalForks = Array.isArray(reposData)
            ? reposData.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)
            : 0;

          setStats({
            repos: userData ? userData.public_repos : fallbackProfile.public_repos,
            followers: userData ? userData.followers : fallbackProfile.followers,
            following: userData ? userData.following : fallbackProfile.following,
            stars: totalStars || fallbackProfile.totalStars,
            forks: totalForks,
            mergedPRs: prsData && typeof prsData.total_count === 'number' ? prsData.total_count : fallbackProfile.merged_prs
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    fetchStats();
  }, [username]);

  const statItems = [
    { label: 'Public Repositories', value: stats.repos, icon: FiGithub },
    { label: 'Total Stars', value: stats.stars, icon: FiStar },
    { label: 'Forks', value: stats.forks, icon: FiGitBranch },
    { label: 'Merged Pull Requests', value: stats.mergedPRs, icon: FiGitPullRequest },
  ];

  return (
    <div className="github-stats-container">
      <div className="github-stats-grid">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="github-stat-card">
              <div className="stat-icon">
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <div className="stat-value">{item.value}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
