// About.jsx
"use client";

import React, { useMemo, useRef } from "react";
import TitleHeader from "../components/TitleHeader";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
        <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.2-.5 7.3 5.22L19 6h-14.8Zm15.3 2.04-6.8 4.86a1.8 1.8 0 0 1-2.1 0L3.8 8.04V17.5c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V8.04Z" />
      </svg>
    ),
  },
];

export default function About() {
  const wrapRef = useRef(null);   // whole timeline section
  const listRef = useRef(null);   // vertical stack of rows
  const trackRef = useRef(null);  // colored progress fill


  useGSAP(() => {
    const ctx = gsap.context(() => {
      // progress fill
      gsap.set(trackRef.current, { scaleY: 0, transformOrigin: "top" });

      ScrollTrigger.create({
        trigger: listRef.current,
        start: "top 75%",
        end: "bottom 25%",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(trackRef.current, { scaleY: self.progress, ease: "none" });
          wrapRef.current?.style?.setProperty(
            "--about-progress",
            `${Math.round(self.progress * 100)}%`
          );
        },
      });

      // per-card entrance
      gsap.utils.toArray(".tl-item").forEach((el) => {
        const fromX = el.classList.contains("tl-left") ? -40 : 40;
        gsap.from(el, {
          x: fromX,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  // content (set offset: "sm" | "lg" to add extra vertical breathing-room for that row)
  const items = useMemo(
    () => [
      {
        key: "bio",
        offset: null,
        node: (
          <div className="rounded-2xl p-6 gradient-border gradient-border--brand">
            <div className="bg-black-300/50 rounded-[calc(theme(borderRadius.2xl)-1.5px)]  p-7 md:h-80">
              <h2 className="gradient-title md:text-4xl text-3xl font-bold leading-tight">
                JS Munasinghe
              </h2>
              <p className="
  relative pl-6 md:text-lg text-white/80 mt-2
  before:content-[''] before:absolute before:left-0 before:top-2
  before:h-2.5 before:w-2.5 before:rounded-full
  before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6]
  before:ring-2 before:ring-white/15
  before:shadow-[0_0_10px_rgba(168,85,247,.6)]
">
                Third-year Software Engineering undergraduate with hands-on experience in full-stack web development.
                Passionate about building scalable applications and collaborating in team environments to deliver high
                quality solutions. Seeking an opportunity to contribute and grow in a dynamic software development role.
              </p>
            </div>
          </div>
        ),
      },
      {
        key: "bio",
        offset: null,
        node: (
          <div className="rounded-2xl p-6 gradient-border gradient-border--brand">
            <div className="bg-black-300/50 rounded-[calc(theme(borderRadius.2xl)-1.5px)] p-7 md:h-80">
              <h2 className="gradient-title md:text-4xl text-3xl font-bold leading-tight">
                Social links
              </h2>
              <p className="
  relative pl-6 md:text-lg text-white/80 mt-2
  before:content-[''] before:absolute before:left-0 before:top-2
  before:h-2.5 before:w-2.5 before:rounded-full
  before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6]
  before:ring-2 before:ring-white/15
  before:shadow-[0_0_10px_rgba(168,85,247,.6)]
">Find me in these </p>

              {/* Replace the whole flex/mapping block with this */}
              <ul className="mt-5  space-y-3">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-3 px-3 py-2 rounded-xl
                   bg-white/5 ring-1 ring-white/10 text-white/80
                   hover:bg-white/10 hover:text-white transition w-fit"
                      aria-label={s.name}
                      title={s.name}
                    >
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg
                     bg-white/5 ring-1 ring-white/10 group-hover:ring-white/20"
                      >
                        {s.svg}
                      </span>
                      <span className="text-base">{s.name}</span>
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        ),
      }
      ,
      {
        key: "Education",
        offset: "sm", // adds a modest gap before this row (zig-zag spacing)
        node: (
          <div className="rounded-2xl p-6 gradient-border gradient-border--brand">
            <div className="bg-black-300/50 rounded-[calc(theme(borderRadius.2xl)-1.5px)] p-7 md:h-80">
              <h3 className="gradient-title md:text-3xl text-2xl font-medium">
                Sri Lanka Institute of Information Technology (SLIIT) (2022-Present)
              </h3>
              <p className="
  relative pl-6 md:text-lg text-white/80 mt-2
  before:content-[''] before:absolute before:left-0 before:top-2
  before:h-2.5 before:w-2.5 before:rounded-full
  before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6]
  before:ring-2 before:ring-white/15
  before:shadow-[0_0_10px_rgba(168,85,247,.6)]
">
                <span className="block text-white">Bachelor of Science Honours in Information Technology Specializing in Software Engineering</span>
                <span className="block">CGPA : 3.33</span>
              </p>

              <h3 className="gradient-title md:text-3xl text-2xl font-medium mt-6"> Bandaranayake College Gampaha(2019)</h3>
              <p className="
  relative pl-6 md:text-lg text-white/80 mt-2
  before:content-[''] before:absolute before:left-0 before:top-2
  before:h-2.5 before:w-2.5 before:rounded-full
  before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6]
  before:ring-2 before:ring-white/15
  before:shadow-[0_0_10px_rgba(168,85,247,.6)]
">
                <span className="block">G.C.E-Advanced-level</span>
              </p>
            </div>
          </div>
        ),
      },
      {
        key: "Courses",
        offset: null,
        node: (
          <div className="rounded-2xl p-6 gradient-border gradient-border--brand">
            <div className="bg-black-300/50 rounded-[calc(theme(borderRadius.2xl)-1.5px)] p-7 md:h-80">
              <h3 className="gradient-title md:text-3xl text-2xl font-medium">
                COURSES
              </h3>
              <div className="md:text-lg text-white/80 mt-2">
                <ul className="list-none space-y-2">
                  <li className="relative pl-6
                   before:content-[''] before:absolute before:left-0 before:top-2
                   before:h-2.5 before:w-2.5 before:rounded-full
                   before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6]
                   before:ring-2 before:ring-white/15
                   before:shadow-[0_0_10px_rgba(168,85,247,.6)]
                   before:transition before:duration-200 hover:before:scale-125">
                    MERN 2025 Edition — Udemy
                  </li>
                  <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6] before:ring-2 before:ring-white/15 before:shadow-[0_0_10px_rgba(168,85,247,.6)] before:transition before:duration-200 hover:before:scale-125">
                    Introduction to JavaScript — SoloLearn
                  </li>
                  <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6] before:ring-2 before:ring-white/15 before:shadow-[0_0_10px_rgba(168,85,247,.6)] before:transition before:duration-200 hover:before:scale-125">
                    JavaScript Intermediate — SoloLearn
                  </li>
                  <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6] before:ring-2 before:ring-white/15 before:shadow-[0_0_10px_rgba(168,85,247,.6)] before:transition before:duration-200 hover:before:scale-125">
                    Introduction to Java — SoloLearn
                  </li>
                  <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6] before:ring-2 before:ring-white/15 before:shadow-[0_0_10px_rgba(168,85,247,.6)] before:transition before:duration-200 hover:before:scale-125">
                    Java Intermediate — SoloLearn
                  </li>
                  <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6] before:ring-2 before:ring-white/15 before:shadow-[0_0_10px_rgba(168,85,247,.6)] before:transition before:duration-200 hover:before:scale-125">
                    Introduction to SQL — SoloLearn
                  </li>
                  <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-gradient-to-br before:from-[#ff28d5] before:via-[#a855f7] before:to-[#3b82f6] before:ring-2 before:ring-white/15 before:shadow-[0_0_10px_rgba(168,85,247,.6)] before:transition before:duration-200 hover:before:scale-125">
                    SQL Intermediate — SoloLearn
                  </li>
                </ul>
              </div>

            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <section id="about" className="relative md:p-0 px-5">
      <div className="container mx-auto w-full md:my-40 my-20">
        <TitleHeader title="About me" text="Passionate creator, Lifelong learner" number="01" />

        {/* wrapper for sticky line + rows */}
        <div ref={wrapRef} className="relative md:mt-20 mt-10">
          {/* Center sticky progress bar as an absolute overlay (no layout push) */}
          {/* Center sticky progress bar as an absolute overlay (no layout push) */}
        <div className="hidden md:block pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
           <div className="sticky top-16 md:top-20 h-rail w-[4px] bg-white/10 rounded-full overflow-hidden" >


              <div
                ref={trackRef}
                className="w-full h-full origin-top scale-y-0 bg-gradient-to-b from-[#ff28d5] via-[#a855f7] to-[#3b82f6]"
              />
            </div>
          </div>


          {/* stack of rows */}
          <div ref={listRef} className="space-y-5 md:space-y-6">
            {items.map((item, i) => {
              // left/right zig-zag
              const left = i % 2 === 0;
              // optional extra vertical spacing before a row
              const rowOffset =
                item.offset === "lg" ? "md:pt-8" : item.offset === "sm" ? "md:pt-6" : "";

              return (
                <div
                  key={item.key}
                  className={`grid md:grid-cols-[1fr_auto_1fr] grid-cols-1 md:gap-x-12 ${rowOffset}`}
                >
                  <div
                    className={`tl-item max-w-[40rem] w-full ${left
                      ? "tl-left md:col-start-1 md:justify-self-end md:mr-6"
                      : "tl-right md:col-start-3 md:justify-self-start md:ml-6"
                      }`}
                  >
                    {item.node}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
