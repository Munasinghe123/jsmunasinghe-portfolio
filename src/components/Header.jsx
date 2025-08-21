import { label } from "motion/react-client"
import React, { useEffect, useRef, useState } from "react"

const NAV = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Tech Stack", id: "tech" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
]

export default function Header() {
    const headerRef = useRef(null)
    const [active, setActive] = useState("about")
    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(0)

    // smooth scroll (fallback even if Tailwind's scroll-smooth not set)
    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth"
    }, [])

    // scroll spy (highlights current section)
    useEffect(() => {
        const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean)
        const io = new IntersectionObserver(
            entries => {
                entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id))
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
        )
        sections.forEach(s => io.observe(s))
        return () => io.disconnect()
    }, [])

    // top progress bar
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            const h = document.body.scrollHeight - window.innerHeight
            setProgress(h ? (y / h) * 100 : 0)
        }
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const scrollTo = id => e => {
        e.preventDefault()
        const el = document.getElementById(id)
        const headerH = headerRef.current?.offsetHeight ?? 0
        if (!el) return
        const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 12)
        window.scrollTo({ top: y, behavior: "smooth" })
        setOpen(false)
    }

    return (
        <>
            {/* HEADER */}
            <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="mt-3 mb-3 flex items-center justify-between rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/15 backdrop-blur supports-[backdrop-filter]:bg-white/10 dark:bg-black/30 dark:ring-white/10">
                        {/* Brand */}
                        <a href="#home" onClick={scrollTo("home")} className="pl-4 pr-3 py-3 font-bold tracking-wide text-white">
                            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
                                JS MUNASINGHE
                            </span>
                        </a>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-2 pr-2">
                            {NAV.map(item => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={scrollTo(item.id)}
                                    className="relative rounded-xl px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
                                >
                                    <span>{item.label}</span>
                                    <span
                                        className={`absolute inset-0 -z-10 rounded-xl transition-all duration-300 ${active === item.id ? "bg-white/12" : "bg-transparent"
                                            }`}
                                    />
                                    {active === item.id && (
                                        <span className="pointer-events-none absolute -bottom-1 left-1/2 h-[2px] w-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-orange-300" />
                                    )}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={scrollTo("contact")}
                                className="ml-1 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 hover:opacity-95"
                            >
                                Contact
                            </a>
                        </nav>

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setOpen(o => !o)}
                            aria-label="Menu"
                            className="md:hidden mr-3 rounded-xl p-2 text-white/90 hover:bg-white/10"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* scroll progress bar */}
                <div className="h-[3px] w-full bg-transparent">
                    <div
                        className="h-[3px] bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-orange-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* MOBILE drawer */}
            <div
                className={`fixed inset-x-0 top-[68px] z-40 mx-4 origin-top overflow-hidden rounded-2xl bg-black/70 backdrop-blur ring-1 ring-white/10 transition-[transform,opacity] duration-300 md:hidden ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
            >
                <nav className="flex flex-col p-3">
                    {NAV.map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={scrollTo(item.id)}
                            className={`rounded-xl px-3 py-3 text-base text-white/90 hover:bg-white/10 ${active === item.id ? "bg-white/10" : ""
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={scrollTo("contact")}
                        className="mt-2 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-orange-400 px-4 py-3 text-center font-semibold text-white shadow-lg"
                    >
                        Contact
                    </a>
                </nav>
            </div>
        </>
    )
}
