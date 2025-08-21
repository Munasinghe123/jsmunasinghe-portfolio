import { useEffect, useRef, useState } from "react";
import { slides } from "../constants";


export default function Carousel() {
  const scrollerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const pointsRef = useRef([]);      // pixel scrollLeft targets for each slide
  const nodesRef = useRef([]);       // slide elements

  const measure = () => {
  const scroller = scrollerRef.current;
  if (!scroller) return;

  const slidesEls = Array.from(scroller.querySelectorAll("[data-slide]"));
  const containerCenter = scroller.clientWidth / 2;
  const max = scroller.scrollWidth - scroller.clientWidth;

  pointsRef.current = slidesEls.map(node => {
    const slideCenter = node.offsetLeft + node.clientWidth / 2;
    const target = slideCenter - containerCenter;
    return Math.max(0, Math.min(max, target)); // clamp
  });

  updateIndex();
};

  // find nearest slide to current scrollLeft
  const updateIndex = () => {
    const scroller = scrollerRef.current;
    const pts = pointsRef.current;
    if (!scroller || pts.length === 0) return;

    const x = scroller.scrollLeft;
    let i = 0;
    let best = Infinity;
    for (let s = 0; s < pts.length; s++) {
      const d = Math.abs(pts[s] - x);
      if (d < best) {
        best = d;
        i = s;
      }
    }
    setIndex(i);
  };

  const scrollToIndex = (i) => {
    const scroller = scrollerRef.current;
    const pts = pointsRef.current;
    if (!scroller || pts.length === 0) return;

    const clamped = Math.max(0, Math.min(pts.length - 1, i));
    scroller.scrollTo({ left: pts[clamped], behavior: "smooth" });
  };

  const next = () => scrollToIndex(index + 1);
  const prev = () => scrollToIndex(index - 1);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    measure();                         // initial
    const ro = new ResizeObserver(measure);
    ro.observe(scroller);

    // if images load later, re-measure once they’re complete
    const imgs = scroller.querySelectorAll("img");
    let pending = imgs.length;
    imgs.forEach((img) => {
      if (img.complete) pending -= 1;
      else img.addEventListener("load", () => { if (--pending === 0) measure(); }, { once: true });
    });
    if (pending === 0) measure();

    scroller.addEventListener("scroll", onScroll, { passive: true });
    function onScroll() { requestAnimationFrame(updateIndex); }

    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canPrev = index > 0;
  const canNext = index < slides.length - 1;

  return (
    <div className="relative w-full lg:h-[80vh] md:h-[50vh] h-[36vh]">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b0620] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0b0620] to-transparent z-10" />

      {/* SCROLLER */}
      <div
        ref={scrollerRef}
        className="absolute inset-0 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar"
      >
        <div className="flex items-center h-full gap-[3vw] px-[6vw]">
          {slides.map((s, i) => (
            <article
              key={i}
              data-slide
              className="flex-none w-[72vw] sm:w-[60vw] md:w-[48vw] lg:w-[36vw] h-[68%] md:h-[78%] lg:h-[82%]
                         rounded-2xl overflow-hidden bg-black/30 ring-1 ring-white/10
                         shadow-[0_20px_60px_rgba(0,0,0,.35)] group"
            >
              <div className="relative w-full h-full">
                <img
                  src={s.img}
                  alt={s.title ?? `slide-${i}`}
                  className="absolute inset-0 w-full h-full transition-transform duration-700  transition-[object-position] duration-700 ease-out
             hover:object-center   group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/55 via-black/20 to-transparent">
                  {s.title && <h3 className="text-white font-semibold text-lg md:text-xl drop-shadow">{s.title}</h3>}
                  {s.subtitle && <p className="text-white/80 text-sm md:text-base">{s.subtitle}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ARROWS */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className={`absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20
          inline-flex items-center justify-center h-11 w-11 rounded-full
          bg-white/10 backdrop-blur ring-1 ring-white hover:bg-white/20
          transition-all active:scale-95 ${!canPrev ? "opacity-40 cursor-default" : ""}`}
        disabled={!canPrev}
      >
        <ArrowLeft />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className={`absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20
          inline-flex items-center justify-center h-11 w-11 rounded-full
          bg-white/10 backdrop-blur ring-1 ring-white hover:bg-white/20
          transition-all active:scale-95 ${!canNext ? "opacity-40 cursor-default" : ""}`}
        disabled={!canNext}
      >
        <ArrowRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              index === i ? "w-6 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
