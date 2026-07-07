import { HomeHeroModeHydrator } from "@/components/home/HomeHeroModeHydrator";
import { HomeHeroRevealSmoother } from "@/components/home/HomeHeroRevealSmoother";

export function HomeHeroModeShowcase() {
  return (
    <>
      <HomeHeroRevealSmoother />
      <HomeHeroModeHydrator />
    </>
  );
}
