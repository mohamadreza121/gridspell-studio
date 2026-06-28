export type ExperienceSceneId =
  | "launch"
  | "luxury"
  | "creative"
  | "technology"
  | "local"
  | "editorial";

export type ExperiencePaletteId =
  | "violet"
  | "cyan"
  | "ember"
  | "lime"
  | "ivory"
  | "ruby";

export type ExperienceButtonEffect =
  | "magnetic"
  | "sweep"
  | "glow"
  | "arrow";

export type ExperienceBackground =
  | "aurora"
  | "grid"
  | "glass"
  | "particles"
  | "rings";

export type ExperienceMotionLevel = "calm" | "balanced" | "expressive";

export type ExperienceConfiguration = {
  scene: ExperienceSceneId;
  palette: ExperiencePaletteId;
  buttonEffect: ExperienceButtonEffect;
  background: ExperienceBackground;
  motion: ExperienceMotionLevel;
};

export type ExperienceScene = {
  id: ExperienceSceneId;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  category: string;
  idealFor: string[];
  strategy: string;
  perception: string;
  conversionGoal: string;
  motionCharacter: string;
  navItems: string[];
  proof: Array<{
    value: string;
    label: string;
  }>;
};

export type ExperiencePalette = {
  id: ExperiencePaletteId;
  label: string;
  accent: string;
  accentSoft: string;
  accentDeep: string;
  foreground: string;
  surface: string;
  surfaceRaised: string;
};
