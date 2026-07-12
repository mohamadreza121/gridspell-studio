import { readFile, writeFile } from "node:fs/promises";

const imageFiles = [
  "src/components/landing-pages/BeautyBookingExperience.tsx",
  "src/components/landing-pages/BeautyTreatmentStack.tsx",
  "src/components/landing-pages/ContractorFieldBookExperience.tsx",
  "src/components/landing-pages/CreatorBrandExperience.tsx",
  "src/components/landing-pages/CreatorOffersCarousel.tsx",
  "src/components/landing-pages/DentalTrustExperience.tsx",
  "src/components/landing-pages/EventLaunchExperienceV2.tsx",
  "src/components/landing-pages/FitnessCoachExperience.tsx",
  "src/components/landing-pages/LandingPageGalleryExperience.tsx",
  "src/components/landing-pages/LawFirmClassicExperience.tsx",
  "src/components/landing-pages/LuxuryRealEstateExperience.tsx",
  "src/components/landing-pages/RestaurantFinalCourse.tsx",
  "src/components/landing-pages/RestaurantMenuExperience.tsx",
  "src/components/work/LandingGalleryWorkExperience.tsx"
];

async function edit(path, transform) {
  const before = await readFile(path, "utf8");
  const after = transform(before);
  if (after !== before) {
    await writeFile(path, after);
    console.log(`updated ${path}`);
  }
}

function removeNamedImports(text, names) {
  for (const name of names) {
    text = text
      .replace(new RegExp(`\\n\\s*${name},`, "g"), "")
      .replace(new RegExp(`,\\s*${name}(?=\\s*[}])`, "g"), "")
      .replace(new RegExp(`\\{\\s*${name},\\s*`, "g"), "{");
  }
  return text;
}

function addImageImport(text) {
  if (text.includes('from "next/image"') || text.includes("from 'next/image'")) return text;
  const importLine = 'import Image from "next/image";\n';
  if (text.startsWith('"use client";')) {
    return text.replace('"use client";\n', `"use client";\n\n${importLine}`);
  }
  return `${importLine}${text}`;
}

function convertImages(text) {
  if (!/<img\b/.test(text)) return text;
  text = addImageImport(text).replace(/<img\b/g, "<Image");
  return text.replace(/<Image\b([\s\S]*?)\/>/g, (match, attrs) => {
    let extra = "";
    if (!/\bwidth=/.test(attrs)) extra += " width={1600}";
    if (!/\bheight=/.test(attrs)) extra += " height={1000}";
    if (!/\bsizes=/.test(attrs)) extra += ' sizes="100vw"';
    if (!/\bunoptimized\b/.test(attrs)) extra += " unoptimized";
    return `<Image${extra}${attrs}/>`;
  });
}

await edit("src/app/(marketing)/demo/saas-modern/page.tsx", (text) => removeNamedImports(text, ["Cpu", "Layers", "MessageSquare", "Zap"]));
await edit("src/components/landing-pages/AuraEngineeringVault.tsx", (text) =>
  removeNamedImports(text, ["Waves"]).replace("setEntered(true);", "window.requestAnimationFrame(() => setEntered(true));")
);
await edit("src/components/landing-pages/AuraEngineeringVaultPortal.tsx", (text) =>
  text.replace("setTarget(host);", "window.requestAnimationFrame(() => setTarget(host));")
);
await edit("src/components/landing-pages/AuraRing3D.tsx", (text) =>
  text.replace('setTarget(document.getElementById("aura-scroll-product"));', 'window.requestAnimationFrame(() => setTarget(document.getElementById("aura-scroll-product")));')
);
await edit("src/components/landing-pages/AuraRingOrbits.tsx", (text) =>
  text.replace('setTarget(document.getElementById("aura-scroll-product"));', 'window.requestAnimationFrame(() => setTarget(document.getElementById("aura-scroll-product")));')
);
await edit("src/components/landing-pages/AuraScrollProduct.tsx", (text) =>
  text.replace("setTargets(hosts);", "window.requestAnimationFrame(() => setTargets(hosts));")
);
await edit("src/components/landing-pages/AuraSensorLab.tsx", (text) =>
  text.replace("setEntered(true);", "window.requestAnimationFrame(() => setEntered(true));")
);
await edit("src/components/landing-pages/AuraSensorLabPortal.tsx", (text) =>
  text.replace("setTarget(host);", "window.requestAnimationFrame(() => setTarget(host));")
);
await edit("src/components/landing-pages/AuraShatterNavbar.tsx", (text) =>
  text
    .replace('setStage("shattered");', 'window.requestAnimationFrame(() => setStage("shattered"));')
    .replace("setTarget(document.body);", "window.requestAnimationFrame(() => setTarget(document.body));")
);
await edit("src/components/landing-pages/BeautyTreatmentStack.tsx", (text) =>
  text.replace("setTarget(section);", "window.requestAnimationFrame(() => setTarget(section));")
);
await edit("src/components/landing-pages/CreatorOffersCarousel.tsx", (text) =>
  text.replace("setTarget(section);", "window.requestAnimationFrame(() => setTarget(section));")
);
await edit("src/components/landing-pages/PulseCanRealismPortal.tsx", (text) =>
  text.replace("setTarget(stage);", "window.requestAnimationFrame(() => setTarget(stage));")
);

await edit("src/components/landing-pages/EventLaunchExperienceV2.tsx", (text) =>
  text
    .replace("const [now, setNow] = useState(Date.now());", "const [now, setNow] = useState(0);")
    .replace(
      "const id = window.setInterval(() => setNow(Date.now()), 1000);\n    return () => window.clearInterval(id);",
      "const updateNow = () => setNow(Date.now());\n    const initialId = window.setTimeout(updateNow, 0);\n    const id = window.setInterval(updateNow, 1000);\n    return () => {\n      window.clearTimeout(initialId);\n      window.clearInterval(id);\n    };"
    )
    .replace(/target - now/g, "target - (now || target)")
);

await edit("src/components/landing-pages/PulseFlavorCardCanPortal.tsx", (text) =>
  text
    .replace("let frame = 0;", "let frame = 0;\n    let attachedTargets: HTMLElement[] = [];")
    .replace("setTargets(nextTargets);", "attachedTargets = nextTargets;\n        setTargets(nextTargets);")
    .replace('targets.forEach((target) => target.classList.remove("pulse-static-can-host"));', 'attachedTargets.forEach((target) => target.classList.remove("pulse-static-can-host"));')
);

await edit("src/components/landing-pages/RestaurantMenuFinishingTouches.tsx", (text) =>
  text
    .replace("let frame = 0;", "let frame = 0;\n    let attachedReviews: HTMLElement | null = null;\n    let attachedFinalCourse: HTMLElement | null = null;")
    .replace("setTargets({ reviews: reviewSection, finalCourse: finalCard });", "attachedReviews = reviewSection;\n        attachedFinalCourse = finalCard;\n        setTargets({ reviews: reviewSection, finalCourse: finalCard });")
    .replace('targets.reviews?.classList.remove("restaurant-guest-notes-host");', 'attachedReviews?.classList.remove("restaurant-guest-notes-host");')
    .replace('targets.finalCourse?.classList.remove("restaurant-final-course-host");', 'attachedFinalCourse?.classList.remove("restaurant-final-course-host");')
);

await edit("src/components/landing-pages/RestaurantMenuExperience.tsx", (text) =>
  text
    .replace("Tonight's feature", "Tonight&apos;s feature")
    .replace("Chef's pairing", "Chef&apos;s pairing")
);

await edit("src/components/landing-pages/ContractorFieldBookExperience.tsx", (text) => removeNamedImports(text, ["Camera", "Ruler"]));
await edit("src/components/landing-pages/CreatorBrandExperience.tsx", (text) => removeNamedImports(text, ["Check"]));
await edit("src/components/landing-pages/DentalTrustExperience.tsx", (text) => removeNamedImports(text, ["Stethoscope"]));
await edit("src/components/landing-pages/EcommerceDropExperience.tsx", (text) => removeNamedImports(text, ["BatteryCharging"]));
await edit("src/components/landing-pages/LandingPageGalleryExperience.tsx", (text) => removeNamedImports(text, ["ReactNode"]));
await edit("src/components/landing-pages/DemoConceptPage.tsx", (text) =>
  text.replace(/,\s*surface\s*([,}])/g, "$1").replace(/\bsurface,\s*/g, "")
);

for (const file of imageFiles) {
  await edit(file, convertImages);
}

console.log("Lint repair codemod completed.");
