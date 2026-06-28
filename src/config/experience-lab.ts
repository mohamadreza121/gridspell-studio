import type {
  ExperienceBackground,
  ExperienceButtonEffect,
  ExperienceConfiguration,
  ExperienceMotionLevel,
  ExperiencePalette,
  ExperienceScene
} from "@/types/experience-lab";

export const experienceScenes: ExperienceScene[] = [
  {
    id: "launch",
    label: "Bold Launch",
    eyebrow: "Ship the next big thing",
    headline: "A launch page built to make the first click feel inevitable.",
    description:
      "A confident product story with bold messaging, focused calls to action, and just enough motion to make the idea feel alive.",
    primaryAction: "Join the waitlist",
    secondaryAction: "Watch the story",
    category: "Startup · Product · SaaS",
    idealFor: ["Startups", "Apps", "Technology products"],
    strategy:
      "Large typography establishes momentum while a single dominant action removes hesitation. Supporting proof stays close to the first decision.",
    perception: "Confident and future-facing",
    conversionGoal: "Waitlist or product signup",
    motionCharacter: "Fast, focused, energetic",
    navItems: ["Product", "Story", "Pricing"],
    proof: [
      { value: "2.4×", label: "faster first action" },
      { value: "41%", label: "clearer message recall" }
    ]
  },
  {
    id: "luxury",
    label: "Quiet Luxury",
    eyebrow: "Objects worth remembering",
    headline: "Restraint, detail, and space for the product to speak.",
    description:
      "A cinematic editorial direction for premium brands that need confidence without visual noise.",
    primaryAction: "Explore the collection",
    secondaryAction: "Private consultation",
    category: "Luxury · Fashion · Architecture",
    idealFor: ["Watches", "Jewelry", "Premium services"],
    strategy:
      "Measured spacing and refined type create perceived value. Slow transitions and selective detail keep the experience premium rather than decorative.",
    perception: "Exclusive and considered",
    conversionGoal: "Qualified inquiry",
    motionCharacter: "Calm, slow, deliberate",
    navItems: ["Collection", "Journal", "Private viewings"],
    proof: [
      { value: "01", label: "curated point of focus" },
      { value: "24h", label: "private response window" }
    ]
  },
  {
    id: "creative",
    label: "Creative Energy",
    eyebrow: "Make some noise",
    headline: "A visual identity that refuses to blend into the feed.",
    description:
      "Oversized type, playful composition, and expressive interaction for brands built around culture and attention.",
    primaryAction: "See the latest drop",
    secondaryAction: "Play the reel",
    category: "Creative · Music · Culture",
    idealFor: ["Agencies", "Events", "Creative portfolios"],
    strategy:
      "Unexpected rhythm and contrast create memorability. Strong hierarchy keeps the energy useful instead of chaotic.",
    perception: "Distinctive and culturally aware",
    conversionGoal: "Audience engagement",
    motionCharacter: "Playful, kinetic, expressive",
    navItems: ["Work", "Studio", "Contact"],
    proof: [
      { value: "08", label: "featured releases" },
      { value: "∞", label: "room to experiment" }
    ]
  },
  {
    id: "technology",
    label: "Precision Technology",
    eyebrow: "Complex systems, made clear",
    headline: "Technical credibility without the usual technical clutter.",
    description:
      "A structured interface for engineering, cybersecurity, and infrastructure businesses that need clarity and trust.",
    primaryAction: "View capabilities",
    secondaryAction: "Open system map",
    category: "Engineering · Security · Infrastructure",
    idealFor: ["Cybersecurity", "Engineering", "Technical consulting"],
    strategy:
      "A disciplined grid and evidence-led content communicate expertise. Motion behaves like a system response rather than decoration.",
    perception: "Precise and highly capable",
    conversionGoal: "Technical discovery call",
    motionCharacter: "Measured, responsive, intelligent",
    navItems: ["Systems", "Labs", "Security"],
    proof: [
      { value: "99.99%", label: "service continuity" },
      { value: "24/7", label: "critical monitoring" }
    ]
  },
  {
    id: "local",
    label: "Trusted Local Business",
    eyebrow: "Clear answers, faster action",
    headline: "A local service website designed to turn visits into real inquiries.",
    description:
      "Straightforward service positioning, visible trust signals, and a frictionless path to request an estimate.",
    primaryAction: "Get a free estimate",
    secondaryAction: "See recent work",
    category: "Contractor · Clinic · Professional service",
    idealFor: ["Contractors", "Clinics", "Home services"],
    strategy:
      "Visitors immediately understand the service, location, and next step. Trust evidence appears before the first major objection.",
    perception: "Reliable and easy to work with",
    conversionGoal: "Qualified local lead",
    motionCharacter: "Friendly, practical, reassuring",
    navItems: ["Services", "Projects", "Reviews"],
    proof: [
      { value: "4.9", label: "average client rating" },
      { value: "20+", label: "years of experience" }
    ]
  },
  {
    id: "editorial",
    label: "Editorial Storytelling",
    eyebrow: "Ideas deserve a point of view",
    headline: "A story-led experience that builds authority before the ask.",
    description:
      "A magazine-inspired direction for consultants, founders, and organizations whose thinking is part of the product.",
    primaryAction: "Read the perspective",
    secondaryAction: "Explore the archive",
    category: "Consulting · Personal brand · Publication",
    idealFor: ["Consultants", "Founders", "Story-led brands"],
    strategy:
      "Editorial pacing gives complex ideas room to land. Strong narrative sequencing turns expertise into trust before introducing the call to action.",
    perception: "Thoughtful and authoritative",
    conversionGoal: "Trust and consultation inquiry",
    motionCharacter: "Elegant, paced, narrative",
    navItems: ["Essays", "Projects", "About"],
    proof: [
      { value: "36", label: "published perspectives" },
      { value: "12 min", label: "average engaged session" }
    ]
  }
];

export const experiencePalettes: ExperiencePalette[] = [
  {
    id: "violet",
    label: "Electric Violet",
    accent: "#8b6cff",
    accentSoft: "rgba(139,108,255,0.22)",
    accentDeep: "#4f35cf",
    foreground: "#f8f7ff",
    surface: "#090a10",
    surfaceRaised: "#141522"
  },
  {
    id: "cyan",
    label: "Cyan Signal",
    accent: "#4de7ff",
    accentSoft: "rgba(77,231,255,0.2)",
    accentDeep: "#0089a3",
    foreground: "#f1fdff",
    surface: "#061014",
    surfaceRaised: "#0c1d23"
  },
  {
    id: "ember",
    label: "Ember Orange",
    accent: "#ff7a45",
    accentSoft: "rgba(255,122,69,0.2)",
    accentDeep: "#c84016",
    foreground: "#fff8f3",
    surface: "#120b08",
    surfaceRaised: "#24140e"
  },
  {
    id: "lime",
    label: "Acid Lime",
    accent: "#c8ff4d",
    accentSoft: "rgba(200,255,77,0.18)",
    accentDeep: "#6b9f00",
    foreground: "#fbfff3",
    surface: "#090d07",
    surfaceRaised: "#151c10"
  },
  {
    id: "ivory",
    label: "Warm Ivory",
    accent: "#f1ddbb",
    accentSoft: "rgba(241,221,187,0.18)",
    accentDeep: "#a68554",
    foreground: "#fffdf8",
    surface: "#0d0b09",
    surfaceRaised: "#1c1813"
  },
  {
    id: "ruby",
    label: "Ruby Red",
    accent: "#ff5378",
    accentSoft: "rgba(255,83,120,0.2)",
    accentDeep: "#b51745",
    foreground: "#fff5f8",
    surface: "#11070b",
    surfaceRaised: "#241018"
  }
];

export const buttonEffects: Array<{
  id: ExperienceButtonEffect;
  label: string;
  description: string;
}> = [
  { id: "magnetic", label: "Magnetic", description: "Follows intent" },
  { id: "sweep", label: "Fill sweep", description: "Directional energy" },
  { id: "glow", label: "Glow trail", description: "Soft luminosity" },
  { id: "arrow", label: "Arrow launch", description: "Crisp response" }
];

export const backgroundOptions: Array<{
  id: ExperienceBackground;
  label: string;
}> = [
  { id: "aurora", label: "Aurora" },
  { id: "grid", label: "Grid" },
  { id: "glass", label: "Glass" },
  { id: "particles", label: "Particles" },
  { id: "rings", label: "Rings" }
];

export const motionOptions: Array<{
  id: ExperienceMotionLevel;
  label: string;
}> = [
  { id: "calm", label: "Calm" },
  { id: "balanced", label: "Balanced" },
  { id: "expressive", label: "Expressive" }
];

export const approvedExperienceCombinations: ExperienceConfiguration[] = [
  {
    scene: "launch",
    palette: "violet",
    buttonEffect: "magnetic",
    background: "aurora",
    motion: "expressive"
  },
  {
    scene: "luxury",
    palette: "ivory",
    buttonEffect: "arrow",
    background: "rings",
    motion: "calm"
  },
  {
    scene: "creative",
    palette: "ember",
    buttonEffect: "sweep",
    background: "glass",
    motion: "expressive"
  },
  {
    scene: "technology",
    palette: "cyan",
    buttonEffect: "glow",
    background: "grid",
    motion: "balanced"
  },
  {
    scene: "local",
    palette: "lime",
    buttonEffect: "arrow",
    background: "particles",
    motion: "calm"
  },
  {
    scene: "editorial",
    palette: "ruby",
    buttonEffect: "sweep",
    background: "aurora",
    motion: "balanced"
  }
];

export const defaultExperienceConfiguration: ExperienceConfiguration =
  approvedExperienceCombinations[0];
