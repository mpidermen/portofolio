// GitHub REST API Integration Module
async function fetchGitHubRepos(username = 'mpidermen') {
    const container = document.getElementById('ghReposGrid');
    if (!container) return;

    // Loading Skeleton
    container.innerHTML = `
        <div class="repo-card skeleton"></div>
        <div class="repo-card skeleton"></div>
        <div class="repo-card skeleton"></div>
    `;

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error(`User '${username}' not found or API rate limit exceeded.`);
        }

        const repos = await response.json();

        if (repos.length === 0) {
            container.innerHTML = `<p style="color:var(--text-secondary); grid-column: 1/-1">No public repositories found for @${username}.</p>`;
            return;
        }

        container.innerHTML = '';
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';
            repoCard.innerHTML = `
                <div>
                    <h4 class="repo-title">
                        <i class="fa-regular fa-folder-closed"></i>
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </h4>
                    <p class="repo-desc">${repo.description || 'No description provided.'}</p>
                </div>
                <div class="repo-meta">
                    <span><i class="fa-solid fa-circle text-orange" style="font-size:0.6rem"></i> ${repo.language || 'Code'}</span>
                    <span><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                </div>
            `;
            container.appendChild(repoCard);
        });

    } catch (error) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; background-color: rgba(239, 68, 68, 0.1); border: 1px solid #EF4444; padding: 16px; border-radius: 8px; color: #EF4444;">
                <i class="fa-solid fa-circle-exclamation"></i> ${error.message}
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos('mpidermen');

    const fetchBtn = document.getElementById('fetchGhBtn');
    const usernameInput = document.getElementById('ghUsernameInput');

    if (fetchBtn && usernameInput) {
        fetchBtn.addEventListener('click', () => {
            const user = usernameInput.value.trim();
            if (user) fetchGitHubRepos(user);
        });
    }
});
