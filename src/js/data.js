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
            downloadUrl: "#"
        }
    ],
    projects: [
        {
            id: "tarsi-budget-tracker",
            title: "Tarsi – Budget Tracker",
            badge: "#1 FINANCE APP",
            subtitle: "APP STORE HIDDEN GEMS",
            iconText: "T",
            iconBg: "#40c057",
            tagline: "An offline-first budget & expense tracker powered by on-device AI.",
            desc: "Tarsi is an intuitive, privacy-first personal finance app built for speed. Designed for users who want total control over their financial data without subscription paywalls or cloud data sharing.",
            problem: "Most budget apps force cloud synchronization, charge monthly subscriptions, or parse bank logins with privacy risks.",
            solution: "Tarsi runs 100% offline using Apple's CoreML to automatically parse receipts, categorize transactions, and generate spending forecasts locally on your device.",
            highlights: [
                "100% Offline & Private (Zero cloud tracking)",
                "Local CoreML receipt scanner & OCR engine",
                "Automated recurring expense detection",
                "App Store Hidden Gems & #1 Finance App selection"
            ],
            techStack: ["Swift", "SwiftUI", "CoreML", "CoreData", "Charts"],
            stats: { rank: "#1 Finance App", downloads: "50,000+", rating: "4.9 ★" },
            downloadUrl: "#",
            mockupBg: "#1f2937"
        },
        {
            id: "kabi-fitness",
            title: "Kabi – Gym Companion",
            badge: "#1 PAID FITNESS APP",
            subtitle: "EDITORIAL CHOICE",
            iconText: "K",
            iconBg: "#212529",
            tagline: "A gym companion app for progressive overload and workout tracking.",
            desc: "Kabi is built for serious lifters who demand zero friction during workouts. Track sets, rest timers, and volume progression with single-tap gesture controls.",
            problem: "Workout trackers are often bloated with complex menus that interrupt workout flow between heavy sets.",
            solution: "Kabi prioritizes haptic feedback and ultra-fast set logging so you can focus on lifting while the app handles automatic rest timing and progressive overload calculations.",
            highlights: [
                "Single-tap set logging with Apple Watch haptic sync",
                "Automated progressive overload calculation",
                "Live Activity widgets for lock screen rest timers",
                "#1 Paid Fitness App on the App Store"
            ],
            techStack: ["SwiftUI", "WatchKit", "ActivityKit", "CoreData"],
            stats: { rank: "#1 Paid Fitness", downloads: "35,000+", rating: "4.8 ★" },
            downloadUrl: "#",
            mockupBg: "#111827"
        },
        {
            id: "travel-buddy",
            title: "Travel Buddy",
            badge: "AI TRAVEL PLANNER",
            subtitle: "BEST NEW PRODUCT",
            iconText: "TB",
            iconBg: "#3b82f6",
            tagline: "Smart itinerary planning & local recommendations powered by GenAI.",
            desc: "Travel Buddy turns chaotic trip planning into a 10-second prompt. Generates personalized day-by-day travel itineraries based on budget, mood, and real-time weather.",
            problem: "Planning trips requires jumping across 10+ tabs of blogs, maps, weather apps, and booking sites.",
            solution: "Travel Buddy consolidates AI trip generation, interactive offline maps, and group itinerary sharing into one seamless mobile experience.",
            highlights: [
                "AI-powered day-by-day itinerary generation",
                "Offline vector maps & pin saving",
                "Multi-currency budget converter",
                "Featured on Tech Product Weekly"
            ],
            techStack: ["React Native", "TypeScript", "FastAPI", "OpenAI APIs"],
            stats: { rank: "Featured AI App", downloads: "20,000+", rating: "4.9 ★" },
            downloadUrl: "#",
            mockupBg: "#0f172a"
        }
    ],
    blog: [
        {
            title: "Stop Focusing Only on the AI Model. Start Building AI Harnesses.",
            preview: "An AI Harness is the system surrounding an AI model that makes it reliable, safe, and dependable...",
            date: "Jul 2026",
            readTime: "2 min",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop"
        },
        {
            title: "My Setup: Poke, MCPs, and a Local Mac Bridge",
            preview: "I finally got my automation stack to a place where it actually works for me instead of the other way around...",
            date: "Jun 2026",
            readTime: "4 min",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&auto=format&fit=crop"
        },
        {
            title: "AI Products Need More Than a Good Demo",
            preview: "What I think about when turning AI demos into products people can trust and use.",
            date: "Jun 2026",
            readTime: "3 min",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop"
        },
        {
            title: "What Small Mobile Apps Taught Me About Taste",
            preview: "What focused apps like budget, fitness, and travel tools taught me about product taste.",
            date: "Jun 2026",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop"
        },
        {
            title: "Boring Guardrails Make AI Features Better",
            preview: "Why practical AI Guardrails are product decisions, not just technical controls.",
            date: "Jun 2026",
            readTime: "3 min",
            image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=400&auto=format&fit=crop"
        }
    ],
    gear: {
        "DESK SETUP": [
            { name: "MacBook Pro", desc: "M3 Max - 128GB memory - 4TB", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop" },
            { name: "Apple Studio Display", desc: "5K display for the desk.", image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=400&auto=format&fit=crop" },
            { name: "Magic Keyboard", desc: "Compact, white - with Touch ID.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop" },
            { name: "Magic Mouse", desc: "White wireless mouse.", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400&auto=format&fit=crop" },
            { name: "Xiaomi Monitor Light Bar", desc: "Glare-free desk lighting.", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop" },
            { name: "Desky Sit-Stand Desk", desc: "Single-motor sit/stand desk.", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=400&auto=format&fit=crop" }
        ],
        "EVERYDAY CARRY": [
            { name: "iPhone 15 Pro Max", desc: "1TB - phone & B-roll camera.", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=400&auto=format&fit=crop" },
            { name: "AirPods Pro", desc: "Daily audio & calls.", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=400&auto=format&fit=crop" },
            { name: "WHOOP 5.0", desc: "Recovery & strain tracking.", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?q=80&w=400&auto=format&fit=crop" }
        ]
    },
    resources: {
        "LEARN AI / ML": [
            { title: "DeepLearning.AI", desc: "Andrew Ng's specializations on ML, deep learning, and generative AI." },
            { title: "fast.ai - Practical Deep Learning", desc: "Top-down, code-first deep learning course for coders." },
            { title: "Hugging Face LLM Course", desc: "Free hands-on course on transformers, NLP, and LLMs." },
            { title: "Google ML Crash Course", desc: "Google's interactive intro to machine learning fundamentals." }
        ],
        "AI ENGINEERING & LLMS": [
            { title: "Anthropic Prompt Engineering", desc: "Official guide to prompting Claude effectively." },
            { title: "Anthropic Cookbook", desc: "Code recipes for building Claude: RAG, tools, agents." },
            { title: "OpenAI Cookbook", desc: "Practical code examples for building with OpenAI models." },
            { title: "LangChain Docs", desc: "Framework docs for building LLM apps, agents, and RAG." }
        ]
    },
    consulting: [
        {
            title: "Private Coaching",
            price: "From ₱10k/hr",
            desc: "1:1 mentoring and guidance — career, code, AI, and building products, tailored to where you are.",
            points: ["1:1 sessions", "Career & technical", "Flexible scheduling"]
        },
        {
            title: "AI & Software Trainings",
            price: "₱20k/hr",
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
            id: "lead-ai-engineer",
            year: "2025 - Present",
            title: "Lead AI Engineer",
            company: "Standard Chartered",
            location: "Manila / Remote",
            desc: "Leading enterprise GenAI initiatives, multi-agent AI harness architectures, and scalable LLM orchestration for banking automation.",
            highlights: [
                "Built autonomous multi-agent systems reducing manual workflow time by 75%",
                "Architected privacy-preserving RAG pipelines on enterprise AWS cloud",
                "Mentored a team of 10+ software & AI engineers"
            ],
            tech: ["Python", "PyTorch", "LangChain", "FastAPI", "AWS", "Docker"]
        },
        {
            id: "ai-ops-engineer",
            year: "2025",
            title: "AI Ops Engineer",
            company: "CoE for GenAI - Cambridge",
            location: "Cambridge, UK",
            desc: "Engineered LLM evaluation frameworks, AI guardrails, and automated model deployment pipelines.",
            highlights: [
                "Designed low-latency inference endpoints serving 100k+ daily queries",
                "Implemented hallucination monitoring & automated safety guardrails"
            ],
            tech: ["Python", "Claude API", "Docker", "Kubernetes", "Prometheus"]
        },
        {
            id: "sr-fullstack-dev",
            year: "2024 - 2025",
            title: "Senior Full-Stack Developer",
            company: "Core Technology",
            location: "Cambridge, UK",
            desc: "Built high-performance web and mobile applications using React, Next.js, and Swift.",
            highlights: [
                "Shipped 3 production web apps used by over 50,000 active users",
                "Reduced bundle load times by 60% through aggressive optimization"
            ],
            tech: ["TypeScript", "React", "Next.js", "SwiftUI", "Node.js"]
        }
    ],
    certsList: [
        {
            title: "Generative AI Leader",
            issuer: "GOOGLE",
            date: "2025",
            logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            verifyUrl: "#",
            skills: ["LLM Architecture", "GenAI Strategy", "Prompt Engineering"]
        },
        {
            title: "Generative AI Certified Professional",
            issuer: "ORACLE",
            date: "2025",
            logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
            verifyUrl: "#",
            skills: ["Oracle AI Services", "Vector Search", "Fine-Tuning"]
        },
        {
            title: "Neo4j Certified Professional",
            issuer: "NEO4J",
            date: "2024",
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Neo4j-logo.svg",
            verifyUrl: "#",
            skills: ["Graph Databases", "Cypher Query", "Knowledge Graphs"]
        },
        {
            title: "AWS Certified AI Practitioner",
            issuer: "AMAZON WEB SERVICES",
            date: "2024",
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
            verifyUrl: "#",
            skills: ["AWS Bedrock", "SageMaker", "Cloud AI Security"]
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
            author: "Henry Aguda",
            role: "Secretary, Dept. of Information & Communications Technology",
            text: "Roldan, I believe, would be the next Philippine unicorn. He is technically skilled, deeply driven, and possesses an extraordinary ability to execute AI & software ideas into real products.",
            initials: "HA"
        },
        {
            author: "Joshua Shailes",
            role: "Senior AI Data Scientist @ GenAI CoE",
            text: "It was a real pleasure to work with Roldan. He's not only a fantastic professional who consistently delivers clean code, but also a visionary AI engineer who understands user experience.",
            initials: "JS"
        },
        {
            author: "Cris Lawrence Adrian",
            role: "Integrations Product Manager",
            text: "Roldan was the most talented software engineer I've mentored in a long time. He's a fast learner, and he always takes full ownership of complex engineering problems.",
            initials: "CA"
        }
    ]
};
