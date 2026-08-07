function renderStackAll() {
    const stackCategories = [
        {
            title: "FRONTEND",
            items: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS", "SCSS", "Styled Components", "Vite", "Webpack", "ESLint", "Prettier"]
        },
        {
            title: "BACKEND",
            items: ["Node.js", "Python", "Java", "PHP", "Express.js", "NestJS", "FastAPI", "Spring Boot", "Laravel", "PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "OAuth", "JWT", "LDAP", "REST", "GraphQL", "gRPC", "AWS Lambda"]
        },
        {
            title: "DEVOPS & CLOUD",
            items: ["AWS", "GCP", "Azure", "GitHub Actions", "Jenkins", "GitLab CI", "Terraform", "AWS CloudFormation", "Docker", "Kubernetes", "Prometheus", "Grafana", "Datadog"]
        },
        {
            title: "AI & MACHINE LEARNING",
            items: ["TensorFlow", "PyTorch", "LangChain", "Transformers", "OpenAI", "Anthropic", "Mistral", "Hugging Face", "LlamaIndex", "AutoGPT", "Claude Code", "Codex"]
        },
        {
            title: "SECURITY & IDENTITY",
            items: ["AWS IAM", "Azure AD", "Okta", "SAP CDC", "Auth0", "Cognito", "AES", "RSA", "SHA", "GDPR", "SOC 2", "ISO 27001"]
        },
        {
            title: "CMS & NO-CODE",
            items: ["WordPress", "Strapi", "Bubble", "Webflow", "Microsoft Power Platform", "n8n"]
        },
        {
            title: "DEVELOPER TOOLS",
            items: ["Git", "GitHub", "GitLab", "Bitbucket", "VS Code", "JetBrains IntelliJ", "PyCharm", "Slack", "Discord", "Teams", "JIRA", "Trello", "ClickUp"]
        }
    ];

    return `
        <div class="stack-page-container reveal">
            <div class="page-header">
                <h2 class="page-title-clean">tech stack</h2>
                <p class="page-desc-clean">The tools, frameworks, and platforms I reach for &mdash; across the front end, back end, infrastructure, and AI.</p>
            </div>

            <div class="stack-category-groups">
                ${stackCategories.map(cat => `
                    <div class="stack-cat-block">
                        <h4 class="stack-cat-title">${cat.title}</h4>
                        <div class="stack-pill-grid">
                            ${cat.items.map(item => `<span class="stack-pill">${item}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
