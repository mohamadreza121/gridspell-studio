"use client";

import { ExperienceSelectionSummary } from "@/components/forms/ExperienceSelectionSummary";
import { PricingSelectionSummary } from "@/components/forms/PricingSelectionSummary";
import { ProjectBriefForm } from "@/components/forms/ProjectBriefForm";

import styles from "./StartProjectExperience.module.css";

export function ProjectBriefInteractive() {
  return (
    <>
      <div className={`${styles.selectionShelf} grid gap-5`}>
        <PricingSelectionSummary />
        <ExperienceSelectionSummary />
      </div>
      <div className={`${styles.formShell} mt-5`}>
        <ProjectBriefForm />
      </div>
    </>
  );
}
