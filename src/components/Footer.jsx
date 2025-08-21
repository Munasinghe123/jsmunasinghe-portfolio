// Footer.jsx
import React from "react";

const LINKS = [
  { id: "about", label: "About me" },
  { id: "tech", label: "Tech stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact me" },
];

const SOCIALS = [
  {
    name: "GitHub",
    href: "https://github.com/Munasinghe123",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.33-1.75c-1.09-.74.08-.73.08-.73a2.52 2.52 0 0 1 1.84 1.24 2.55 2.55 0 0 0 3.49 1 2.55 2.55 0 0 1 .76-1.6c-2.67-.3-5.47-1.33-5.47-5.94A4.66 4.66 0 0 1 5.3 7.1a4.34 4.34 0 0 1 .12-3.2s1.01-.33 3.3 1.24a11.38 11.38 0 0 1 6 0c2.29-1.57 3.3-1.24 3.3-1.24.47 1.18.4 2.5.12 3.2a4.66 4.66 0 0 1 1.24 3.23c0 4.62-2.8 5.63-5.47 5.93a2.86 2.86 0 0 1 .82 2.22v3.29c0 .33.22.7.83.58A12 12 0 0 0 12 .5Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sankalpa-munasinghe-16060719b/",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8.5h4.9V24H.5zM8.4 8.5h4.7v2.11h.07c.65-1.24 2.23-2.55 4.6-2.55 4.9 0 5.8 3.22 5.8 7.41V24H18.6v-6.85c0-1.63-.03-3.73-2.27-3.73-2.28 0-2.63 1.78-2.63 3.62V24H8.4z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:jsan39196@gmail.com",
    svg: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.2-.5 7.3 5.22L19 6h-14.8Zm15.3 2.04-6.8 4.86a1.8 1.8 0 0 1-2.1 0L3.8 8.04V17.5c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V8.04Z"/>
      </svg>
    ),
  },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector("header");
  const offset = (header?.offsetHeight ?? 0) + 16;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full mt-32 bg-white/[0.045] ring-1 ring-white/10 backdrop-blur-xl">
      {/* thin gradient hairline across the full width */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* content constrained to your usual container width */}
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="text-xl md:text-2xl font-bold text-white">
              JS<span className="text-white/60">.portfolio</span>
            </div>
            <p className="text-white/70 mt-3 max-w-md leading-relaxed">
              Building crisp UIs, playful motion, and performant 3D with
              React, GSAP, and Three.js.
            </p>

            <div className="flex gap-2 mt-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-xl
                             bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white
                             hover:bg-white/10 transition"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick nav */}
          <div>
            <h4 className="text-white font-semibold mb-3">Navigate</h4>
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="text-white/75 hover:text-white transition"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-white/75">
              <li>
                <a
                  href="mailto:jsan39196@gmail.com"
                  className="hover:text-white transition"
                >
                  jsan39196@gmail.com
                </a>
              </li>
              <li>Gampaha, Sri Lanka</li>
              <li className="text-white/60">Available for freelance & collabs</li>
            </ul>

            <button
              onClick={() => scrollToId("contact")}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl
                         bg-gradient-to-r from-[#ff28d5] via-[#a855f7] to-[#3b82f6]
                         text-white font-medium shadow-[0_10px_30px_rgba(168,85,247,.35)]
                         hover:brightness-110 transition"
            >
              Let’s talk
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {year} JS Munasinghe — Built with React • Tailwind • Three.js
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl
                       bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white
                       hover:bg-white/10 transition"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 -translate-y-[1px] transition-transform group-hover:-translate-y-1"
              fill="currentColor"
            >
              <path d="M12 4l7 7-1.4 1.4L13 8.8V20h-2V8.8L6.4 12.4 5 11l7-7z" />
            </svg>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
