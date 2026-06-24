insert into public.services(slug,title,summary,position,published) values
('business-websites','Business Website Design & Development','Conversion-focused custom websites for established businesses.',1,true),
('website-redesign','Strategic Website Redesign','A visual, structural, and technical transformation for an outdated website.',2,true),
('landing-pages','Campaign & Landing Pages','Focused conversion experiences for offers, launches, and campaigns.',3,true),
('client-portals','Client Portals & Dashboards','Secure product-like experiences for clients, teams, and operations.',4,true),
('full-stack-apps','Custom Full-Stack Web Applications','Purpose-built applications with secure data and scalable foundations.',5,true),
('care-plans','Website Care & Growth','Ongoing ownership, monitoring, updates, and improvement.',6,true)
on conflict(slug) do update set title=excluded.title,summary=excluded.summary,position=excluded.position,published=excluded.published;
