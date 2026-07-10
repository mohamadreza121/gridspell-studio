"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { AuraEngineeringVault } from "@/components/landing-pages/AuraEngineeringVault";

export function AuraEngineeringVaultPortal() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const host = document.getElementById("specs");
    if (!host) return;

    host.classList.add("aura-engineering-vault-host");
    setTarget(host);

    return () => {
      host.classList.remove("aura-engineering-vault-host");
    };
  }, []);

  return (
    <>
      {target ? createPortal(<AuraEngineeringVault />, target) : null}
      <style>{`
        #specs.aura-engineering-vault-host {
          padding: 0 !important;
          background: #03060a !important;
          color: white !important;
        }

        #specs.aura-engineering-vault-host > :not(.aura-engineering-vault) {
          display: none !important;
        }

        #specs.aura-engineering-vault-host > .aura-engineering-vault {
          display: block;
          width: 100%;
        }
      `}</style>
    </>
  );
}
