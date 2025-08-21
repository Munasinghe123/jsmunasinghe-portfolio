const navItems = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];


// src/constants/index.js (or wherever this is)

const withBase = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}`

export const iconsList = [
  { name: "html",       image: withBase("images/html.svg") },
  { name: "css",        image: withBase("images/css.svg") },
  { name: "javascript", image: withBase("images/js.svg") },
  { name: "react",      image: withBase("images/react.svg") },
  { name: "typescript", image: withBase("images/ts.svg") },
  { name: "github",     image: withBase("images/github.svg") },
  { name: "gsap",       image: withBase("images/gsap.svg") },
  { name: "threejs",    image: withBase("images/threejs.svg") },
  { name: "redux",      image: withBase("images/redux.svg") },
  { name: "docker",     image: withBase("images/docker.svg") },
]


// slides.ts / slides.js
const withBasee = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}`

export const slides = [
  { id: 1, title: "Earth Explorer", img: withBasee('images/EarthExplorer.png') },
  { id: 2, title: "Academix",       img: withBasee('images/Academix.png') },
  { id: 3, title: "ClassEase",      img: withBasee('images/ClassEase.png') },
]



const footerIconsList = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: "/images/b-fb.svg",
  },
  {
    name: "Instagram",
    href: "https://www.facebook.com/",
    icon: "/images/b-insta.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.facebook.com/",
    icon: "/images/b-linked.svg",
  },
  {
    name: "WhatsApp",
    href: "https://www.facebook.com/",
    icon: "/images/b-whatsapp.svg",
  },
];

export {
  navItems,
  footerIconsList,
};
