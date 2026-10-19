window.portfolioData = {
    shop: [
        {
            id: "developer-resume-template",
            title: "Developer Resume Template",
            type: "TEMPLATE",
            price: "Free",
            tag: "RESUME TEMPLATE",
            subtitle: "Edit in Word or Google Docs",
            desc: "A clean, ATS-friendly resume template for software developers — editable in Microsoft Word or Google Docs.",
            whatsInside: [
                "A one-page <code>.docx</code> template with a professional, recruiter-friendly layout",
                "Pre-filled <strong>example content for a developer</strong> — just swap in your own",
                "Clear sections and sensible defaults that parse well in applicant tracking systems"
            ],
            sections: "Education · Work Experience · Projects · Activities · Skills & Certifications",
            footerText: "Just download, open in Word or Google Docs, and edit away — completely free.",
            downloadUrl: "assets/resume/developer-resume-template.docx"
        }
    ],
    projects: [
        {
            id: "tarsi-budget-tracker",
            title: "Tarsi – Budget Tracker",
            cmdTitle: "Tarsi – Budget Tracker Case Study",
            cmdIcon: "ph-wallet",
            badge: "OFFLINE-FIRST",
            subtitle: "LOCAL DATA PRIVACY",
            iconText: "T",
            iconBg: "#10b981",
            tagline: "An offline-first budget & expense tracker powered by local on-device storage.",
            desc: "Tarsi is an intuitive, privacy-first personal finance application built for speed. Designed for users who want total control over their financial records without subscription paywalls, advertising trackers, or cloud data exposure.",
            problem: "Most budget apps force third-party cloud synchronization, charge recurring subscriptions, or parse bank logins with privacy risks.",
            solution: "Tarsi operates 100% locally on-device, parsing expense records, categorizing daily transactions, and computing monthly budget forecasts with instant response times.",
            highlights: [
                "100% Offline & Private (Zero cloud tracking or remote sync)",
                "Instant transaction entry and category categorization",
                "Automated recurring expense and balance detection",
                "Encrypted local storage with zero advertising telemetry"
            ],
            architecture: {
                pattern: "Offline-First Local Persistence",
                layers: [
                    { step: "01", label: "Transaction Capture UI", detail: "Zero-latency expense and income entry with category tagging and recurring rules." },
                    { step: "02", label: "On-Device Forecast Engine", detail: "Computes daily burn rates, category allocations, and monthly balance projections locally." },
                    { step: "03", label: "Encrypted Local Store", detail: "Persists structured financial records in local storage with zero remote telemetry." }
                ]
            },
            techStack: ["Swift", "SwiftUI", "CoreData", "Charts", "Local Storage"],
            stats: { rank: "Offline-First", downloads: "Local Storage", rating: "Zero Cloud Sync" },
            downloadUrl: "https://github.com/RoldanGaspar",
            mockupBg: "#1f2937",
            homeCard: {
                posClass: "pos-center",
                ariaLabel: "Open project: Tarsi",
                shortTitle: "Tarsi &mdash; Budget Tracker",
                shortDesc: "An offline-first budget &amp; expense tracker powered by local on-device storage.",
                tags: [
                    { text: "&lang; OFFLINE-FIRST &rang;", dark: true },
                    { text: "LOCAL ENCRYPTION", dark: false },
                    { text: "ZERO CLOUD SYNC", dark: false }
                ],
                iconClass: "ph-fill ph-wallet",
                badgeClass: "tarsi-bg",
                badgeStyle: "",
                storeBadges: [
                    { cls: "appstore", icon: "ph-fill ph-shield-check", label: "Privacy First" },
                    { cls: "playstore", icon: "ph-fill ph-database", label: "SQLite / Local" }
                ]
            }
        },
        {
            id: "awardena-security",
            title: "AWarden-A — AppLocker & Credential Defense",
            cmdTitle: "AWarden-A – AppLocker Defense Tool",
            cmdIcon: "ph-shield-check",
            badge: "CYBERSECURITY TOOL",
            subtitle: "WINDOWS DEFENSE & AUTOMATION",
            iconText: "🛡️",
            iconBg: "#0ea5e9",
            tagline: "AppLocker policy automation and credential security tooling for Windows administration.",
            desc: "AWarden-A streamlines Windows AppLocker policy enforcement, credential protection, and security posture automation for system administrators, SOC analysts, and defense teams.",
            problem: "Manual AppLocker rule authoring is error-prone, fragile across large environments, and often leaves administrative bypasses or credential theft vectors open in Windows enterprise deployments.",
            solution: "AWarden-A provides automated policy rule generation, binary hash validation, and execution auditing with least-privilege enforcement to prevent unauthorized script and executable execution.",
            highlights: [
                "Automated AppLocker XML rule generation & verification",
                "Credential Guard and LSASS defense posture auditing",
                "Windows event log ingestion for unauthorized execution attempts",
                "Open-source TypeScript automation suite"
            ],
            architecture: {
                pattern: "Least-Privilege Policy Pipeline",
                layers: [
                    { step: "01", label: "Binary & Script Discovery", detail: "Scans target Windows directories to fingerprint executables, scripts, and publisher signatures." },
                    { step: "02", label: "AppLocker Rule Synthesizer", detail: "Generates deterministic XML policy rules and audits LSASS / Credential Guard posture." },
                    { step: "03", label: "Enforcement & Event Telemetry", detail: "Deploys least-privilege execution policies and ingests Windows Security event logs." }
                ]
            },
            techStack: ["TypeScript", "PowerShell", "Windows Security", "AppLocker", "Defense-in-Depth"],
            stats: { rank: "Security Tool", downloads: "GitHub Repo", rating: "TypeScript / PS" },
            downloadUrl: "https://github.com/RoldanGaspar/AWarden-A-applocker_credentials",
            mockupBg: "#0f172a",
            homeCard: {
                posClass: "pos-left",
                ariaLabel: "Open project: AWarden-A",
                shortTitle: "AWarden-A &mdash; AppLocker Defense",
                shortDesc: "Windows AppLocker policy automation and credential security tooling.",
                tags: [
                    { text: "&lang; CYBERSECURITY TOOL &rang;", dark: true }
                ],
                iconClass: "ph-fill ph-shield-checkered",
                badgeClass: "kabi-bg",
                badgeStyle: "background:#0ea5e9;",
                storeBadges: [
                    { cls: "appstore", icon: "ph-fill ph-github-logo", label: "GitHub" },
                    { cls: "playstore", icon: "ph-fill ph-code", label: "TypeScript" }
                ]
            }
        },
        {
            id: "pos-inventory",
            title: "POS & Inventory System",
            cmdTitle: "POS & Inventory Management Suite",
            cmdIcon: "ph-package",
            badge: "FULL-STACK SUITE",
            subtitle: "TRANSACTIONAL MANAGEMENT",
            iconText: "📦",
            iconBg: "#f59e0b",
            tagline: "Point of Sale & inventory desktop suite with automated stock replenishment and sales analytics.",
            desc: "A robust desktop POS and inventory management suite engineered for low-latency retail checkouts, barcode scanning, and multi-tier inventory reconciliation.",
            problem: "Small and medium retail establishments suffer from inventory discrepancies, manual stock calculations, and fragile spreadsheet-based accounting.",
            solution: "Architected a relational inventory engine with atomic SQL transactions, barcode parsing, receipt generation, and real-time revenue reporting.",
            highlights: [
                "Atomic transactional sales logging and receipt generation",
                "Real-time stock depletion alerts and reorder calculations",
                "User role-based access control (Cashier vs Manager)",
                "Daily and monthly revenue analytical reporting"
            ],
            architecture: {
                pattern: "ACID Transactional Retail Engine",
                layers: [
                    { step: "01", label: "Checkout & Barcode Terminal", detail: "Captures SKU scans, cart line items, and role-authenticated cashier actions." },
                    { step: "02", label: "Atomic SQL Ledger", detail: "Executes ACID-compliant stock decrements and invoice commits in a single transaction." },
                    { step: "03", label: "Replenishment & Analytics", detail: "Triggers low-stock threshold alerts and aggregates daily/monthly revenue reports." }
                ]
            },
            techStack: ["Python", "SQLite/PostgreSQL", "Tkinter/PyQt", "Data Analytics"],
            stats: { rank: "Full-Stack Suite", downloads: "GitHub Repo", rating: "Python / SQL" },
            downloadUrl: "https://github.com/RoldanGaspar/pos_with_inventory_system",
            mockupBg: "#18181b",
            homeCard: {
                posClass: "pos-right",
                ariaLabel: "Open project: POS with Inventory System",
                shortTitle: "POS &amp; Inventory System",
                shortDesc: "Point of Sale &amp; inventory desktop suite with automated stock replenishment.",
                tags: [
                    { text: "&lang; FULL-STACK SUITE &rang;", dark: true }
                ],
                iconClass: "ph-fill ph-package",
                badgeClass: "travel-bg",
                badgeStyle: "background:#f59e0b;",
                storeBadges: [
                    { cls: "appstore", icon: "ph-fill ph-github-logo", label: "GitHub" },
                    { cls: "playstore", icon: "ph-fill ph-terminal-window", label: "Python" }
                ]
            }
        },
        {
            id: "pet-hub-payroll",
            title: "Pet Hub — Veterinary & Payroll Suite",
            cmdTitle: "Pet Hub – Veterinary & Payroll System",
            cmdIcon: "ph-calculator",
            badge: "WORKFORCE & PAYROLL",
            subtitle: "AUTOMATED HR & CLINIC OPS",
            iconText: "🐾",
            iconBg: "#8b5cf6",
            tagline: "Veterinary clinic employee management and automated payroll computation suite.",
            desc: "Pet Hub Payroll streamlines veterinary clinic operations by unifying staff scheduling, attendance tracking, statutory deductions, and automated payslip generation into a single TypeScript application.",
            problem: "Veterinary clinics and small healthcare teams often rely on disconnected spreadsheets to track shift attendance, overtime, and payroll deductions, leading to calculation errors and delayed payouts.",
            solution: "Engineered a modular TypeScript workforce and payroll engine that automates timekeeping aggregation, gross-to-net salary computation, and role-based clinic staff records.",
            highlights: [
                "Automated gross-to-net payroll calculation with deduction rules",
                "Veterinary staff scheduling, shift attendance, and role management",
                "Instant itemized payslip breakdown and audit-ready summary exports",
                "Type-safe modular TypeScript architecture"
            ],
            architecture: {
                pattern: "Modular TypeScript Domain Engine",
                layers: [
                    { step: "01", label: "Attendance & Shift Ingestion", detail: "Validates staff time-in/out logs, shift differentials, and clinic role assignments." },
                    { step: "02", label: "Payroll Computation Core", detail: "Applies deterministic gross-to-net rules, overtime multipliers, and deduction tables." },
                    { step: "03", label: "Payslip & Audit Ledger", detail: "Generates structured per-employee payslip summaries and clinic payroll reports." }
                ]
            },
            techStack: ["TypeScript", "JavaScript", "HTML5", "CSS3", "Payroll Automation"],
            stats: { rank: "Clinic Ops", downloads: "GitHub Repo", rating: "TypeScript" },
            downloadUrl: "https://github.com/RoldanGaspar/pet-hub-payroll",
            mockupBg: "#1e1b4b"
        }
    ],
    blog: [
        {
            id: "building-ai-harnesses",
            title: "Stop Focusing Only on the AI Model. Start Building AI Harnesses.",
            preview: "An AI Harness is the system surrounding an AI model that makes it reliable, safe, and dependable in production.",
            date: "Jul 2026",
            readTime: "4 min",
            category: "AI Engineering",
            tags: ["AI Agents", "Verification", "Architecture"],
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
            sections: [
                {
                    id: "model-vs-system",
                    heading: "The Model Is Only Half the System",
                    paragraphs: [
                        "When an AI workflow fails in production, teams usually blame the model first. They swap prompts or wait for the next frontier checkpoint. In practice, most reliability gains come from the harness around the model—not the raw weights.",
                        "An AI harness is the deterministic scaffolding that constrains what a model sees, what tools it can invoke, and how its outputs are verified before anything touches production state."
                    ],
                    callout: "A frontier model without a verification harness is just a fast way to generate unverified state changes."
                },
                {
                    id: "four-layers-of-a-harness",
                    heading: "Four Layers of a Dependable Harness",
                    paragraphs: [
                        "In this portfolio repository, the AI harness lives directly inside the codebase as structured rules, scoped context docs, and a zero-dependency static verifier script.",
                        "Every change goes through four deterministic gates: context scoping, explicit schema contracts, read/write boundaries, and automated verification before commit."
                    ],
                    code: {
                        lang: "javascript",
                        snippet: "// Deterministic pre-flight check before any route or data change ships\nfunction verifyRouteContract(routes, registeredViews) {\n    const missing = Object.entries(routes)\n        .filter(([, fn]) => typeof registeredViews[fn] !== 'function');\n    if (missing.length > 0) {\n        throw new Error(`Broken route bindings: ${missing.map(([r]) => r).join(', ')}`);\n    }\n    return { ok: true, checked: Object.keys(routes).length };\n}"
                    }
                },
                {
                    id: "design-for-recovery",
                    heading: "Design for Fast Feedback Loops",
                    paragraphs: [
                        "When the verifier catches a broken global or a missing asset in 200 milliseconds, an agent can self-correct in a single turn instead of shipping a silent regression.",
                        "Before optimizing your prompt, invest in the harness: strict schemas, fast local checks, and clear rollback paths."
                    ]
                }
            ]
        },
        {
            id: "mcp-automation-stack",
            title: "My Setup: Poke, MCPs, and a Local Bridge",
            preview: "I finally got my automation stack to a place where it actually works for me instead of the other way around.",
            date: "Jun 2026",
            readTime: "4 min",
            category: "Systems & MCP",
            tags: ["MCP", "Supabase", "Automation"],
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop",
            sections: [
                {
                    id: "why-mcp-matters",
                    heading: "Connecting Code, Database, and Deployment",
                    paragraphs: [
                        "Context switching between a code editor, database dashboard, and deployment logs drains momentum. Using the Model Context Protocol (MCP), those surfaces connect directly into a single development loop.",
                        "Instead of copying SQL migrations by hand or guessing why a table insert failed, the agent inspects schema definitions and Row-Level Security policies directly."
                    ]
                },
                {
                    id: "least-privilege-by-default",
                    heading: "Least Privilege on Every Tool Call",
                    paragraphs: [
                        "Connecting powerful tools requires strict operational boundaries. Public client keys only ever get narrow permissions—such as inserting a contact message or calling an atomic counter RPC—while destructive table operations require explicit human confirmation."
                    ],
                    code: {
                        lang: "sql",
                        snippet: "-- Row-Level Security: allow anonymous inserts, block public reads\nALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY \"allow_anon_insert_contact\"\nON public.contact_messages\nFOR INSERT TO anon\nWITH CHECK (char_length(message) BETWEEN 5 AND 2000);"
                    }
                },
                {
                    id: "keeping-the-stack-simple",
                    heading: "Keeping the Runtime Zero-Build",
                    paragraphs: [
                        "Even with cloud integrations and database telemetry, the frontend remains plain HTML, CSS tokens, and vanilla JavaScript. No fragile bundler plugins—just clean standards that load fast anywhere."
                    ]
                }
            ]
        },
        {
            id: "ai-products-beyond-demos",
            title: "AI Products Need More Than a Good Demo",
            preview: "What I think about when turning AI demos into products people can trust and use every day.",
            date: "Jun 2026",
            readTime: "3 min",
            category: "Product Engineering",
            tags: ["Product", "UX", "Reliability"],
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop",
            sections: [
                {
                    id: "the-demo-gap",
                    heading: "The Gap Between a 90% Demo and a Dependable Tool",
                    paragraphs: [
                        "Building a flashy AI prototype takes an afternoon. Making that same feature predictable when a user has slow mobile connectivity, ambiguous input, or strict privacy requirements is where real engineering begins.",
                        "Users do not care how complex your prompt pipeline is if the interface freezes or fabricates an answer."
                    ],
                    callout: "Trust is built in the edge cases: clear loading states, honest fallbacks, and zero fabricated data."
                },
                {
                    id: "grounded-responses",
                    heading: "Ground Every Output in Verified Data",
                    paragraphs: [
                        "Whether building a portfolio assistant or a customer-facing workflow, answers should be anchored to a single source of truth. When data is unknown, saying so clearly is always better than guessing."
                    ]
                }
            ]
        },
        {
            id: "small-mobile-apps-product-taste",
            title: "What Small Mobile Apps Taught Me About Taste",
            preview: "What focused apps like budget, fitness, and travel tools taught me about restraint and interface craft.",
            date: "Jun 2026",
            readTime: "5 min",
            category: "Design & Craft",
            tags: ["UI/UX", "Mobile", "Design Systems"],
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop",
            sections: [
                {
                    id: "restraint-over-clutter",
                    heading: "Restraint Beats Feature Bloat",
                    paragraphs: [
                        "On a 375px mobile screen, every extra border, badge, and competing accent color taxes the user's attention. Good interface taste comes from removing elements until only the essential hierarchy remains.",
                        "A single clear primary action, generous whitespace, and legible monospace metadata age far better than heavy gradients."
                    ]
                },
                {
                    id: "tokens-and-themes",
                    heading: "Design Tokens Keep Light and Dark Themes Honest",
                    paragraphs: [
                        "Hard-coding hex colors inside components guarantees visual drift. Routing every surface, border, and text role through semantic CSS custom properties ensures both light and dark modes maintain crisp contrast."
                    ],
                    code: {
                        lang: "css",
                        snippet: ":root {\n    --bg-color: #fcfcfc;\n    --card-bg: #ffffff;\n    --text-color: #111111;\n    --border-color: #e5e5e5;\n}\n\n[data-theme=\"dark\"] {\n    --bg-color: #0b0c0e;\n    --card-bg: #12151b;\n    --text-color: #f3f4f6;\n    --border-color: #1f242d;\n}"
                    }
                }
            ]
        },
        {
            id: "boring-ai-guardrails",
            title: "Boring Guardrails Make AI Features Better",
            preview: "Why practical AI guardrails—input validation, DOM escaping, and rate limits—are product decisions, not just security checkboxes.",
            date: "Jun 2026",
            readTime: "3 min",
            category: "AI Security",
            tags: ["Cybersecurity", "XSS Defense", "Guardrails"],
            image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=600&auto=format&fit=crop",
            sections: [
                {
                    id: "security-starts-at-the-boundary",
                    heading: "Security Starts at the Input Boundary",
                    paragraphs: [
                        "Coursework in Cisco CyberOps and Network Defense reinforces a timeless principle: never trust unvalidated ingress traffic. That applies equally to network packets at a perimeter firewall and user input in an AI chat drawer.",
                        "Rendering untrusted strings with innerHTML opens immediate DOM XSS vectors. Inserting user messages strictly via textContent neutralizes script injection before it ever reaches the DOM."
                    ],
                    code: {
                        lang: "javascript",
                        snippet: "// Safe DOM insertion: neutralizes script & HTML injection payloads\nfunction appendUserMessage(rawText) {\n    const bubble = document.createElement('div');\n    bubble.className = 'ai-msg user';\n    bubble.textContent = rawText.slice(0, 200);\n    messagesContainer.appendChild(bubble);\n}"
                    }
                },
                {
                    id: "defense-in-depth",
                    heading: "Defense in Depth Across Client and Database",
                    paragraphs: [
                        "Client-side length checks improve UX, but real enforcement happens at the database and policy layer. Pairing frontend validation with PostgreSQL Row-Level Security and strict schema constraints ensures the system stays resilient even when queried directly."
                    ],
                    callout: "Good security guardrails feel invisible to honest users and impenetrable to automated probes."
                }
            ]
        }
    ],
    gear: {
        "WORKSTATION & HARDWARE": [
            { name: "Windows Development Workstation", desc: "Windows 11 · Multi-core CPU · Local AI, CyberOps Lab & Full-Stack Dev", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400&auto=format&fit=crop" },
            { name: "Dual-Display Coding Setup", desc: "Primary high-refresh coding monitor + vertical documentation & telemetry display.", image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=400&auto=format&fit=crop" },
            { name: "Tactile Mechanical Keyboard", desc: "Custom-mapped shortcuts for terminal, IDE navigation, and rapid debugging.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop" },
            { name: "Precision Wireless Mouse", desc: "Ergonomic low-latency mouse for daily engineering and UI craft.", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400&auto=format&fit=crop" },
            { name: "Monitor Light Bar", desc: "Glare-free desk lighting for late-night coding sessions.", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop" }
        ],
        "AI & CYBERSECURITY ENVIRONMENT": [
            { name: "Antigravity & VS Code", desc: "Spec-driven agentic workflow with GSD Core, Roo Code, Ralph Loop & CodeRabbit.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop" },
            { name: "Cisco Packet Tracer & CyberOps Lab", desc: "Network topology simulation, ACL hardening, and intrusion detection labs.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop" },
            { name: "Supabase & Vercel Cloud CLI", desc: "PostgreSQL with Row-Level Security (RLS) and zero-build edge deployments.", image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=400&auto=format&fit=crop" }
        ]
    },
    resources: {
        "LEARN AI / ML": [
            { title: "DeepLearning.AI", desc: "Andrew Ng's specializations on ML, deep learning, and generative AI.", url: "https://www.deeplearning.ai/" },
            { title: "fast.ai - Practical Deep Learning", desc: "Top-down, code-first deep learning course for coders.", url: "https://course.fast.ai/" },
            { title: "Hugging Face LLM Course", desc: "Free hands-on course on transformers, NLP, and LLMs.", url: "https://huggingface.co/learn/nlp-course" },
            { title: "Google ML Crash Course", desc: "Google's interactive intro to machine learning fundamentals.", url: "https://developers.google.com/machine-learning/crash-course" }
        ],
        "AI ENGINEERING & LLMS": [
            { title: "Anthropic Prompt Engineering", desc: "Official guide to prompting Claude effectively.", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
            { title: "Anthropic Cookbook", desc: "Code recipes for building Claude: RAG, tools, agents.", url: "https://github.com/anthropics/anthropic-cookbook" },
            { title: "OpenAI Cookbook", desc: "Practical code examples for building with OpenAI models.", url: "https://cookbook.openai.com/" },
            { title: "LangChain Docs", desc: "Framework docs for building LLM apps, agents, and RAG.", url: "https://python.langchain.com/docs/introduction/" }
        ]
    },
    consulting: [
        {
            title: "Private Coaching",
            price: "Open for Inquiry",
            desc: "1:1 mentoring and guidance — career, code, AI, and building products, tailored to where you are.",
            points: ["1:1 sessions", "Career & technical", "Flexible scheduling"]
        },
        {
            title: "AI & Software Trainings",
            price: "Custom Quote",
            desc: "Hands-on, practical workshops for teams — generative AI, modern web & mobile, and shipping faster with AI-native tooling.",
            points: ["Team workshops", "Custom curriculum", "On-site or remote"]
        },
        {
            title: "Fractional CTO",
            price: "Custom",
            desc: "Technical leadership without a full-time hire — architecture, roadmap, hiring, and hands-on execution for founders and teams.",
            points: ["Architecture & strategy", "Team & hiring", "Hands-on delivery"]
        },
        {
            title: "Software Development",
            price: "Custom",
            desc: "End-to-end product builds — web apps, mobile apps, and AI products, from prototype to production.",
            points: ["Web & mobile", "AI products", "MVP -> scale"]
        }
    ],
    experienceList: [
        {
            id: "independent-software-ai-engineer",
            initials: "RG",
            year: "2025 – PRESENT",
            shortYear: "2026",
            title: "Software & AI Systems Builder",
            company: "Independent & Open-Source Engineering",
            shortCompany: "Independent & Open-Source",
            employmentType: "Self-Directed · Portfolio & Production",
            location: "Pampanga, Philippines · Remote",
            desc: "Designing and shipping zero-dependency web applications, AI agent harnesses, and cloud-backed developer tools on Vercel and Supabase.",
            highlights: [
                "Architected a zero-build single-page portfolio and interactive 3D Cyber-Loft backed by Supabase PostgreSQL Row-Level Security (RLS) and atomic telemetry RPCs.",
                "Built deterministic AI engineering workflows using Model Context Protocol (MCP) integrations, static verification scripts, and grounded assistant guardrails."
            ],
            tech: ["JavaScript (ES6+)", "TypeScript", "Python", "Supabase (PostgreSQL)", "AI Harnesses & MCP"]
        },
        {
            id: "cybersecurity-network-defense",
            initials: "CN",
            year: "2025 – 2026 · 315+ HRS COURSEWORK",
            shortYear: "2026",
            title: "Cybersecurity & Network Defense Track",
            company: "Cisco Networking Academy & DICT-ITU DTC Initiative",
            shortCompany: "Cisco NetAcad · DICT-ITU",
            employmentType: "Verified Credential Track",
            location: "Philippines",
            desc: "Completed 9 verified Cisco Networking Academy certifications and AWS Cloud 101 training covering network defense, ethical hacking, security alerts, and Python/JavaScript engineering.",
            highlights: [
                "Earned verified credentials in Ethical Hacker (70 hrs), Network Defense (27 hrs), JavaScript Essentials 1 & 2 (90 hrs), Python Essentials 1 & 2 (70 hrs), Data Analytics Essentials (30 hrs), and Networking Basics (22 hrs).",
                "Engineered AWarden-A (Windows AppLocker & credential defense automation) and an interactive browser-based CyberOps SOC telemetry simulator."
            ],
            tech: ["Network Defense", "Ethical Hacking", "AppLocker", "Python", "AWS Cloud 101"]
        },
        {
            id: "open-source-fullstack-systems",
            initials: "OS",
            year: "2024 – 2026",
            shortYear: "2025",
            title: "Full-Stack & Desktop Application Developer",
            company: "Open-Source Projects (GitHub @RoldanGaspar)",
            shortCompany: "Open-Source · GitHub",
            employmentType: "Project Engineering",
            location: "Pampanga, Philippines",
            desc: "Built offline-first personal finance software, retail point-of-sale inventory suites, and automated payroll computation systems.",
            highlights: [
                "Developed Tarsi (offline-first budget & expense tracker with local storage), POS & Inventory System (Python/SQL transactional retail suite), and Pet Hub Payroll (TypeScript employee payroll engine)."
            ],
            tech: ["Python", "TypeScript", "SQLite / SQL", "Offline-First Architecture"]
        }
    ],
    certsList: [
        {
            title: "Network Defense",
            issuer: "CISCO NETWORKING ACADEMY",
            date: "2026",
            badgeUrl: "https://images.credly.com/images/51526f76-711b-4caf-b04d-27f89512b112/NetworkDefense_v1_091721.png",
            credlyUrl: "https://www.credly.com/badges/4317f869-fb2b-4cfd-a377-3ff898d6d236",
            verifyUrl: "https://www.credly.com/badges/4317f869-fb2b-4cfd-a377-3ff898d6d236",
            certificateImage: "assets/certificates/network-defense.png",
            skills: ["Network Security", "Security Operations", "Perimeter Defense"]
        },
        {
            title: "Ethical Hacker",
            issuer: "CISCO NETWORKING ACADEMY",
            date: "2026",
            badgeUrl: "https://images.credly.com/images/242902b5-f527-42ad-865e-977c9e1b5b58/image.png",
            credlyUrl: "https://www.credly.com/badges/b75d8f5e-1b06-4be1-8f2e-d5a2fc5ead83",
            verifyUrl: "https://www.credly.com/badges/b75d8f5e-1b06-4be1-8f2e-d5a2fc5ead83",
            certificateImage: "assets/certificates/ethical-hacker.png",
            skills: ["Ethical Hacking", "Vulnerability Discovery", "Threat Analysis"]
        },
        {
            title: "AWS Educate Introduction to Cloud 101",
            shortTitle: "AWS Cloud 101",
            issuer: "AMAZON WEB SERVICES",
            date: "2026",
            badgeUrl: "https://images.credly.com/images/e51a8579-188d-4363-8ed1-12ad164ef57b/blob",
            credlyUrl: "https://www.credly.com/badges/7eda7327-b679-4eaf-b005-a761222d2fc9",
            verifyUrl: "https://www.credly.com/badges/7eda7327-b679-4eaf-b005-a761222d2fc9",
            skills: ["AWS Cloud", "Cloud Foundations", "Compute & Storage"]
        },
        {
            title: "Python Essentials (1 & 2)",
            issuer: "CISCO NETWORKING ACADEMY",
            date: "2026",
            badgeUrl: "https://images.credly.com/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png",
            credlyUrl: "https://www.credly.com/badges/ae0773b6-42f5-4558-9d79-7f769fa1a114",
            verifyUrl: "https://www.credly.com/badges/ae0773b6-42f5-4558-9d79-7f769fa1a114",
            certificateImage: "assets/certificates/python-essentials-1.png",
            skills: ["Python", "Programming Fundamentals", "Data Structures"]
        }
    ],
    netacadCertsList: [
        {
            title: "JavaScript Essentials 1",
            issuer: "CISCO NETWORKING ACADEMY",
            academy: "Networking Academy",
            date: "Sep 12, 2026",
            hours: 40,
            description: "Design, develop, and improve JavaScript programs.",
            badgeUrl: "https://images.credly.com/images/b93bf373-3da6-4ada-9879-a0c39d6a11f8/image.png",
            credlyUrl: "https://www.credly.com/badges/9a2489bc-b20c-4600-8e5e-7f4cbdb524e0",
            verifyUrl: "https://www.netacad.com/certificates/?issuanceId=cd68c261-6098-4948-b38b-dd52b2735bcb",
            certificateImage: "assets/certificates/javascript-essentials-1.png",
            skills: ["JavaScript", "Programming Fundamentals"]
        },
        {
            title: "JavaScript Essentials 2",
            issuer: "CISCO NETWORKING ACADEMY",
            academy: "Networking Academy",
            date: "Sep 12, 2026",
            hours: 50,
            description: "Build a strong JavaScript foundation and prepare for JSA certification.",
            badgeUrl: "https://images.credly.com/images/e090c1e1-dbd4-40f8-bbb3-93cc07884d7f/image.png",
            credlyUrl: "https://www.credly.com/badges/06bf7beb-dc73-484f-94ce-8d0835d4e146",
            verifyUrl: "https://www.netacad.com/certificates/?issuanceId=9bb8a3cf-fbd2-4f21-9f0d-f84cd0bb6577",
            certificateImage: "assets/certificates/javascript-essentials-2.png",
            skills: ["JavaScript", "JSA Preparation"]
        },
        {
            title: "Network Defense",
            issuer: "CISCO NETWORKING ACADEMY",
            academy: "Networking Academy",
            date: "Sep 12, 2026",
            hours: 27,
            description: "Monitor and protect networks while evaluating security alerts.",
            badgeUrl: "https://images.credly.com/images/51526f76-711b-4caf-b04d-27f89512b112/NetworkDefense_v1_091721.png",
            credlyUrl: "https://www.credly.com/badges/4317f869-fb2b-4cfd-a377-3ff898d6d236",
            verifyUrl: "https://www.netacad.com/certificates/?issuanceId=bb7d044d-e528-4437-aa58-21e42aebfcad",
            certificateImage: "assets/certificates/network-defense.png",
            skills: ["Network Security", "Security Alerts"]
        },
        {
            title: "Ethical Hacker",
            issuer: "CISCO NETWORKING ACADEMY",
            academy: "Networking Academy",
            date: "Sep 12, 2026",
            hours: 70,
            description: "Uncover cyber threats and vulnerabilities before attackers do.",
            badgeUrl: "https://images.credly.com/images/242902b5-f527-42ad-865e-977c9e1b5b58/image.png",
            credlyUrl: "https://www.credly.com/badges/b75d8f5e-1b06-4be1-8f2e-d5a2fc5ead83",
            verifyUrl: "https://www.netacad.com/certificates/?issuanceId=95403cdc-07e9-4bd9-b45f-71b3f8d8d6c8",
            certificateImage: "assets/certificates/ethical-hacker.png",
            skills: ["Ethical Hacking", "Vulnerability Discovery"]
        },
        {
            title: "Data Analytics Essentials",
            issuer: "CISCO NETWORKING ACADEMY",
            academy: "DICT-ITU DTC Initiative",
            date: "Sep 12, 2026",
            hours: 30,
            description: "Learn the essential tools of data analytics.",
            badgeUrl: "https://images.credly.com/images/1fdfeaeb-e61c-4450-bdfe-a07bd4e715df/image.png",
            credlyUrl: "https://www.credly.com/badges/b8f40efc-a6b3-469a-9c5a-c9dbd20cad2e",
            verifyUrl: "https://www.netacad.com/certificates/?issuanceId=d84879d8-31bf-4a50-914a-4536d08ca89d",
            certificateImage: "assets/certificates/data-analytics-essentials.png",
            skills: ["Data Analytics", "Analytics Tools"]
        },
        {
            title: "Python Essentials 1",
            issuer: "CISCO NETWORKING ACADEMY",
            academy: "Networking Academy",
            date: "Sep 12, 2026",
            hours: 30,
            description: "Learn fundamental programming concepts with Python.",
            badgeUrl: "https://images.credly.com/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png",
            credlyUrl: "https://www.credly.com/badges/ae0773b6-42f5-4558-9d79-7f769fa1a114",
            verifyUrl: "https://www.netacad.com/certificates/?issuanceId=6426f512-66bf-48cd-8fa4-71c9ff65efbb",
            certificateImage: "assets/certificates/python-essentials-1.png",
            skills: ["Python", "Programming Fundamentals"]
        },
        {
            title: "Python Essentials 2",
            issuer: "CISCO NETWORKING ACADEMY",
            academy: "Networking Academy",
            date: "Sep 12, 2026",
            hours: 40,
            description: "Expand Python programming skills and prepare for certification.",
            badgeUrl: "https://images.credly.com/images/3f802526-7274-4230-91ab-f6d1a35340e6/image.png",
            credlyUrl: "https://www.credly.com/badges/7ca14f5f-c2fd-4144-a7ca-96a847b30a3c",
            verifyUrl: "https://www.netacad.com/certificates/?issuanceId=d0cbc502-cd0f-453c-8724-6b3cbd4ae4f5",
            certificateImage: "assets/certificates/python-essentials-2.png",
            skills: ["Python", "Certification Prep"]
        },
        {
            title: "Networking Basics",
            issuer: "CISCO NETWORKING ACADEMY",
            academy: "Networking Academy",
            date: "Aug 27, 2026",
            hours: 22,
            description: "Learn how computer networks operate.",
            badgeUrl: "https://images.credly.com/images/5bdd6a39-3e03-4444-9510-ecff80c9ce79/image.png",
            credlyUrl: "https://www.credly.com/badges/3982861e-0288-4e85-b483-6e954f46a3e4",
            verifyUrl: "https://www.netacad.com/certificates/?issuanceId=673d5cb3-f150-4d96-b0d0-02c172234ce5",
            certificateImage: "assets/certificates/networking-basics.png",
            skills: ["Networking", "Network Fundamentals"]
        },
        {
            title: "Introduction to Cybersecurity",
            issuer: "CISCO NETWORKING ACADEMY",
            academy: "Networking Academy",
            date: "Jun 12, 2026",
            hours: 6,
            description: "Explore cybersecurity and why it is a future-proof career.",
            badgeUrl: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
            credlyUrl: "https://www.credly.com/badges/0ef8090b-0504-475e-a886-c36f33baed44",
            verifyUrl: "https://www.netacad.com/certificates/?issuanceId=1eb1be6e-5686-48c4-a91b-d98d1ca892ee",
            certificateImage: "assets/certificates/introduction-to-cybersecurity.png",
            skills: ["Cybersecurity", "Security Awareness"]
        }
    ],
    credlyAdditionalBadgesList: [
        {
            title: "AWS Educate Introduction to Cloud 101 - Training Badge",
            issuer: "AMAZON WEB SERVICES",
            academy: "AWS Educate",
            date: "Jun 13, 2026",
            description: "Completed the AWS Educate Introduction to Cloud 101 training.",
            badgeUrl: "https://images.credly.com/images/e51a8579-188d-4363-8ed1-12ad164ef57b/blob",
            credlyUrl: "https://www.credly.com/badges/7eda7327-b679-4eaf-b005-a761222d2fc9",
            skills: ["AWS", "Cloud Foundations"]
        }
    ],
    netacadAchievementsList: [
        {
            title: "Resource Specialist",
            date: "Jun 12, 2026",
            badgeUrl: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/resource_specialist_7.png"
        },
        {
            title: "Network Defense",
            date: "Jun 12, 2026",
            badgeUrl: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/network_defense_6.png"
        },
        {
            title: "System Safeguards",
            date: "Jun 12, 2026",
            badgeUrl: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/system_safeguards_5.png"
        },
        {
            title: "Threat Analysis",
            date: "Jun 12, 2026",
            badgeUrl: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/threat_analysis_4.png"
        },
        {
            title: "Cybersecurity Administration",
            date: "Jun 12, 2026",
            badgeUrl: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/cybersecurity_administration_3.png"
        }
    ],
    recsList: [
        {
            author: "Cisco Networking Academy",
            role: "Cybersecurity & Software Engineering Track (9 Verified Certificates)",
            shortRole: "9 VERIFIED CERTIFICATES",
            text: "Verified completion of over 315 hours of technical coursework across Ethical Hacking, Network Defense, Python Essentials 1 & 2, JavaScript Essentials 1 & 2, Networking Basics, and Introduction to Cybersecurity.",
            shortText: "Verified completion of 315+ hours across Ethical Hacking, Network Defense, Python 1 & 2, and JavaScript 1 & 2.",
            initials: "CN"
        },
        {
            author: "DICT-ITU DTC Initiative",
            role: "Cisco Networking Academy · Data Analytics Essentials",
            shortRole: "DATA ANALYTICS TRACK",
            text: "Completed the 30-hour Data Analytics Essentials program under the Department of Information and Communications Technology (DICT) and ITU Digital Transformation Centres Initiative.",
            shortText: "Completed the 30-hour Data Analytics Essentials program under the DICT-ITU Digital Transformation Centres Initiative.",
            initials: "DT"
        },
        {
            author: "Amazon Web Services (AWS)",
            role: "AWS Educate · Introduction to Cloud 101",
            shortRole: "AWS EDUCATE CLOUD 101",
            text: "Verified Credly training badge demonstrating foundational proficiency in AWS cloud architecture, core compute, storage services, and cloud security principles.",
            shortText: "Verified Credly badge in AWS cloud foundations, core compute, storage services, and cloud security principles.",
            initials: "AW"
        }
    ],
    featuredStack: ["TypeScript", "JavaScript", "Python", "SQL", "Supabase", "AWS", "Network Defense"],
    stackCategories: [
        {
            title: "LANGUAGES & CORE",
            items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "HTML5", "CSS3", "PowerShell", "Bash"]
        },
        {
            title: "FRONTEND & WEB ARCHITECTURE",
            items: ["Vanilla JS SPA", "React", "Next.js", "CSS Custom Tokens", "Web Audio API", "HTML5 Canvas", "Responsive UI"]
        },
        {
            title: "BACKEND & DATABASE",
            items: ["Node.js", "FastAPI", "Supabase", "PostgreSQL", "Row-Level Security (RLS)", "SQLite", "REST APIs"]
        },
        {
            title: "AI & AGENTIC WORKFLOWS",
            items: ["Model Context Protocol (MCP)", "GSD Core", "Roo Code", "Ralph Loop", "CodeRabbit", "Prompt Engineering", "RAG Pipelines"]
        },
        {
            title: "CYBERSECURITY & CLOUD",
            items: ["Network Defense", "Ethical Hacking", "Windows AppLocker", "Endpoint Security", "AWS Cloud Foundations", "Vercel Edge CDN"]
        },
        {
            title: "DEVELOPER & DATA TOOLS",
            items: ["Git", "GitHub", "VS Code", "Antigravity IDE", "Cisco Packet Tracer", "Data Analytics"]
        }
    ],
    cyberLab: {
        subtitle: "Interactive SOC telemetry, packet inspection, and threat mitigation sandbox grounded in Cisco NetAcad CyberOps, Network Defense, and Ethical Hacking coursework.",
        nodes: [
            { id: "wan", label: "WAN Ingress", ip: "203.0.113.1", role: "External Untrusted Edge", ports: "80, 443, 22", tier: 0 },
            { id: "fw", label: "Perimeter IDS/FW", ip: "10.0.0.1", role: "Stateful Firewall & Snort IPS", ports: "ACL Policy #104", tier: 1 },
            { id: "sw", label: "Core L3 Switch", ip: "10.0.1.1", role: "VLAN 10/20/30 Trunking", ports: "802.1Q / OSPF", tier: 2 },
            { id: "web", label: "App Gateway", ip: "10.0.10.12", role: "Reverse Proxy & TLS Termination", ports: "443/TCP", tier: 3, lane: -1 },
            { id: "sec", label: "SOC Endpoint", ip: "10.0.20.45", role: "Hardened Workstation & EDR", ports: "Syslog 514/UDP", tier: 3, lane: 0 },
            { id: "db", label: "Data Vault", ip: "10.0.30.88", role: "PostgreSQL + RLS Enforced", ports: "5432/TCP", tier: 3, lane: 1 }
        ],
        defenseRules: [
            { id: "acl", label: "Stateful ACL Filtering", code: "permit tcp any eq 443", desc: "Drops unauthorized port scans and malformed non-TLS ingress packets.", active: true },
            { id: "rate", label: "SYN Flood Rate Limiter", code: "limit-pps 100 burst 25", desc: "Throttles volumetric TCP SYN floods at the perimeter edge.", active: true },
            { id: "dpi", label: "Deep Packet WAF / SQLi", code: "inspect http-payload sqli", desc: "Inspects Layer-7 payloads for union select & script injection signatures.", active: true },
            { id: "ztna", label: "Zero-Trust SSH Guard", code: "deny tcp any eq 22 brute", desc: "Blocks credential stuffing and unauthorized lateral movement to endpoints.", active: true }
        ],
        threatScenarios: [
            { id: "ddos", label: "SYN Flood DDoS", mitre: "T1498.001", protocol: "TCP SYN", target: "web", mitigatedBy: "rate", payload: "SYN_FLOOD len=64 flags=[S] seq=0 win=512" },
            { id: "sqli", label: "SQLi Auth Bypass", mitre: "T1190", protocol: "HTTPS L7", target: "db", mitigatedBy: "dpi", payload: "POST /login ' OR 1=1 -- UNION SELECT" },
            { id: "scan", label: "Stealth Port Scan", mitre: "T1046", protocol: "TCP FIN/NULL", target: "sw", mitigatedBy: "acl", payload: "NMAP_SCAN ports=1-1024 flags=[F,P,U]" },
            { id: "brute", label: "SSH Brute-Force", mitre: "T1110.001", protocol: "SSH-2.0", target: "sec", mitigatedBy: "ztna", payload: "AUTH_ATTEMPT user=root tries=48/sec" }
        ],
        verifiedFoundations: [
            "CyberOps Associate",
            "Ethical Hacker",
            "Network Defense",
            "Endpoint Security",
            "Networking Devices & Config"
        ]
    }
};
