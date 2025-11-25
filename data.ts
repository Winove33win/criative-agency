import { TrendingUp, Hexagon, Monitor, Play, Smartphone, Globe } from 'lucide-react';

export const services = [
  { 
    id: 'strategy',
    title: "Strategy & Positioning", 
    desc: "Market analysis, brand DNA definition, and go-to-market roadmaps that cut through noise.",
    icon: Globe,
    lottieUrl: "https://assets5.lottiefiles.com/packages/lf20_qp1q7mct.json"
  },
  { 
    id: 'branding',
    title: "Branding & Visual Identity", 
    desc: "Radical logos, typography systems, and visual languages that define categories.",
    icon: Hexagon,
    lottieUrl: "https://assets3.lottiefiles.com/packages/lf20_w98qte06.json"
  },
  { 
    id: 'web',
    title: "Web & Interactive", 
    desc: "High-performance React/Next.js sites, WebGL experiences, and e-commerce architectures.",
    icon: Monitor,
    lottieUrl: "https://assets2.lottiefiles.com/packages/lf20_49rdyysj.json"
  },
  { 
    id: 'social',
    title: "Social & Content", 
    desc: "Vertical video production, influencer activation, and community management.",
    icon: Smartphone,
    lottieUrl: "https://assets8.lottiefiles.com/packages/lf20_sfgpb58h.json"
  },
  { 
    id: 'performance',
    title: "Performance & Paid Media", 
    desc: "Data-driven acquisition campaigns across Meta, Google, and TikTok.",
    icon: TrendingUp,
    lottieUrl: "https://assets8.lottiefiles.com/packages/lf20_o1j5t5yp.json"
  },
  { 
    id: 'motion',
    title: "Motion, 3D & Experiential", 
    desc: "Cinema-grade 3D animation, product renders, and physical brand activations.",
    icon: Play,
    lottieUrl: "https://assets9.lottiefiles.com/packages/lf20_h9kds1my.json"
  }
];

export const processSteps = [
  { step: "01", title: "Discovery & Research", text: "We tear down to build up. Deep dive into your data, audience, and brand positioning." },
  { step: "02", title: "Concept & Design", text: "Defining the vectors of growth and visual direction. Prototyping the future." },
  { step: "03", title: "Build & Launch", text: "High-velocity production sprints. We ship fast, break norms, and deploy flawless code." },
  { step: "04", title: "Scale & Optimize", text: "Constant iteration based on real-time performance data to maximize ROAS." }
];

export const servicePacks = [
  {
    title: "Launch Pack",
    desc: "Everything a startup needs to go to market with impact.",
    includes: ["Brand Identity System", "Landing Page (High Convert)", "Social Media Setup", "Pitch Deck Design", "Basic SEO Setup"]
  },
  {
    title: "Brand Refresh",
    desc: "Modernize your legacy brand for the digital age.",
    includes: ["Logo & Visual Update", "Website Redesign", "Content Strategy", "Brand Guidelines", "Social Templates"]
  },
  {
    title: "Always-On Content",
    desc: "Consistent growth engine for established brands.",
    includes: ["12 Short-form Videos/mo", "Community Management", "Weekly Blog/Article", "Monthly Performance Report", "Ad Creative Rotation"]
  }
];

export const projects = [
  { 
    id: "cyberpunk-motors", 
    slug: "cyberpunk-motors",
    client: "CYBERPUNK MOTORS", 
    category: "Branding", 
    type: "Rebranding + 3D", 
    stats: "+400% Web Traffic", 
    heroImg: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop",
    year: "2024",
    services: ["Branding", "3D Modeling", "Web Design"],
    challenge: "Cyberpunk Motors needed to transition from a niche concept to a mass-market EV competitor without losing their edgy, futuristic soul.",
    solution: "We created a kinetic visual identity system based on the physics of speed. The web experience utilizes WebGL for real-time car configuration, and the 3D assets blur the line between reality and render.",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1000&auto=format&fit=crop"
    ],
    results: [
      { label: "Web Traffic", value: "+400%" },
      { label: "Pre-orders", value: "15k+" },
      { label: "Brand Sentiment", value: "98% Positive" }
    ]
  },
  { 
    id: "neon-drinks", 
    slug: "neon-drinks", 
    client: "NEON DRINKS", 
    category: "Social", 
    type: "Social Campaign", 
    stats: "2M+ Views", 
    heroImg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
    year: "2023",
    services: ["Social Strategy", "Content Production", "Influencer Management"],
    challenge: "Launching a new energy drink in a saturated market dominated by giants.",
    solution: "A 'Night Life' focused campaign targeting underground electronic music scenes. We used high-contrast flash photography and kinetic typography to capture the raw energy of the rave.",
    gallery: [
      "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
    ],
    results: [
      { label: "Video Views", value: "2M+" },
      { label: "Retail Partners", value: "500+" },
      { label: "Engagement Rate", value: "12%" }
    ]
  },
  { 
    id: "quantum-finance", 
    slug: "quantum-finance",
    client: "QUANTUM FINANCE", 
    category: "Web", 
    type: "Web Design", 
    stats: "2x Conversion Rate", 
    heroImg: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop",
    year: "2024",
    services: ["UX/UI", "Frontend Dev", "Security Audit"],
    challenge: "Making DeFi accessible and trustworthy for institutional investors.",
    solution: "A clean, data-heavy interface that feels like a Bloomberg terminal from 2050. Dark mode by default, real-time data visualization, and zero-latency interactions.",
    gallery: [
      "https://images.unsplash.com/photo-1642104704074-907c0698b98d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop"
    ],
    results: [
      { label: "Conversion Rate", value: "2x" },
      { label: "Assets Managed", value: "$50M+" },
      { label: "Load Time", value: "<0.8s" }
    ]
  },
  { 
    id: "echo-fashion", 
    slug: "echo-fashion", 
    client: "ECHO FASHION", 
    category: "Motion", 
    type: "Launch Event", 
    stats: "Sold Out in 10m", 
    heroImg: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1000&auto=format&fit=crop",
    year: "2023",
    services: ["Event Design", "Projection Mapping", "Live Stream"],
    challenge: "Creating a phygital runway show that engages both live attendees and remote viewers.",
    solution: "We wrapped the physical runway in LED screens and used motion capture to project digital avatars walking alongside models. The live stream allowed users to buy items directly from the video player.",
    gallery: [
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
    ],
    results: [
      { label: "Sell Out Time", value: "10 min" },
      { label: "Live Viewers", value: "85k" },
      { label: "Press Mentions", value: "40+" }
    ]
  }
];