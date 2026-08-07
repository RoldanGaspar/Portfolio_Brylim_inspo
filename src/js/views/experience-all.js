function renderExperienceAll() {
    return `
        <div class="experience-page-container reveal">
            <div class="page-header">
                <h2 class="page-title-clean">experience</h2>
                <p class="page-desc-clean">Six years building across AI engineering and full-stack development &mdash; from internal GenAI platforms at global enterprises to 60+ products shipped for startups.</p>
            </div>

            <div class="exp-timeline-list">
                <!-- Item 1: Standard Chartered -->
                <div class="exp-timeline-item">
                    <div class="exp-avatar-square">SC</div>
                    <div class="exp-timeline-content">
                        <div class="exp-company-header">
                            <h3>Standard Chartered</h3>
                            <span class="exp-employment-type">Full-time</span>
                        </div>
                        <div class="exp-role-block">
                            <h4 class="exp-role-title">Lead AI Engineer</h4>
                            <span class="exp-date-duration">AUG 2025 &ndash; PRESENT &middot; 11 MOS</span>
                            <p class="exp-summary-text">Driving AI initiatives and system-level solutions across key areas of the business. Focused on scalable, secure, and responsible innovation.</p>
                            <div class="exp-dashed-skills">
                                <span class="dashed-skill">Artificial Intelligence (AI)</span>
                                <span class="dashed-skill">Generative AI</span>
                                <span class="dashed-skill">+2 skills</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Item 2: Cambridge University Press & Assessment -->
                <div class="exp-timeline-item">
                    <div class="exp-avatar-square">CU</div>
                    <div class="exp-timeline-content">
                        <div class="exp-company-header">
                            <h3>Cambridge University Press & Assessment</h3>
                            <span class="exp-employment-type">Full-time &middot; 1 yr 2 mos</span>
                        </div>
                        <span class="exp-location-tag">Makati, National Capital Region, Philippines &middot; Hybrid</span>
                        
                        <div class="exp-role-block">
                            <h4 class="exp-role-title">AI Ops Engineer</h4>
                            <span class="exp-date-duration">FEB 2025 &ndash; AUG 2025 &middot; 7 MOS</span>
                            <p class="exp-summary-text">Pioneered the GenAI Centre of Excellence to deliver scalable AI solutions that support the organization's global education and publishing initiatives.</p>
                            <ul class="exp-detail-bullets">
                                <li>Led GenAI model deployments across Azure Foundry and AWS Bedrock, leveraging Dockerized workflows orchestrated through ECS with Fargate, App Runner, and Amplify. Standardized DevOps practices with CI/CD pipelines, IAM policy hardening, automated EC2/Lambda provisioning, and secure secret management via AWS Secrets Manager and Parameter Store. Integrated centralized observability using CloudWatch for logs, metrics, and alerting.</li>
                                <li>Architected and deployed a WhatsApp-based lesson planner for South African Foundation Phase educators. The solution utilized Turn.io for conversational UX, n8n for orchestration, and Qdrant for vector search, enabling context-aware RAG over curriculum documents for rapid lesson plan generation.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
