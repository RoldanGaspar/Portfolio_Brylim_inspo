const portfolioData = {
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
    ]
};
