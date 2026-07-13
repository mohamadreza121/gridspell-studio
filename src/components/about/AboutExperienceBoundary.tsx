import { AboutDesktopLoader } from "@/components/about/AboutDesktopLoader";
import { AboutStaticFallback } from "@/components/about/AboutStaticFallback";

export function AboutExperienceBoundary() {
  return (
    <>
      <div className="xl:hidden">
        <AboutStaticFallback />
      </div>

      <div className="hidden xl:block">
        <AboutDesktopLoader />
      </div>
    </>
  );
}
