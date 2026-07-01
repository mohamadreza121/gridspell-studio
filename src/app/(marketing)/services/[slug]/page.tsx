import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { getServiceBySlug, services } from "@/config/services";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  return createPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    image: `/services/${service.slug}/opengraph-image`,
    imageAlt: `${service.title} by GridSpell Studio`
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <>
      <PageIntro
        eyebrow={`Service ${service.number}`}
        title={service.title}
        description={service.summary}
      />
      <section className="py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[.32em] text-white/28">Best fit</p>
            <p className="mt-5 text-xl leading-9 text-white/58">{service.idealFor}</p>
          </div>
          <div className="rounded-[2rem] border border-white/[.09] bg-white/[.025] p-8">
            <p className="text-xs uppercase tracking-[.32em] text-[#8be9ff]">
              Core deliverables
            </p>
            <ul className="mt-8 grid gap-5">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-white/[.07] pb-5 text-lg text-white/62"
                >
                  <Check className="mt-1 h-5 w-5 text-[#8be9ff]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
