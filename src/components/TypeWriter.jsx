"use client";

import React, { useEffect, useState } from "react";

/**
 * Typewriter (looping with 2s blinking-caret pause).
 *
 * Props:
 * - text: string to type (or use `words` array)
 * - words: array of strings to cycle through
 * - as: tag to render ("h1" | "h2" | "p" | "span")
 * - className: typography classes
 * - typeSpeed: ms per character while typing
 * - deleteSpeed: ms per character while deleting
 * - startDelay: ms before first character
 * - finishDelay: ms to pause (blink) after fully typed   (default 2000ms)
 * - showCaret: show the caret
 */
export default function Typewriter({
  text = "Undergraduate",
  words,
  as = "h1",
  className = "",
  typeSpeed = 70,
  deleteSpeed = 45,
  startDelay = 200,
  finishDelay = 2000,
  showCaret = true,
}) {
  const Tag = as;
  const list = Array.isArray(words) && words.length ? words : [text];

  const [phrase, setPhrase] = useState(0);
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(false); // blink only during idle pause

  const current = list[phrase] ?? "";
  const visible = current.slice(0, i);

  useEffect(() => {
    let t;

    // initial delay before first char
    if (i === 0 && !deleting && phrase === 0) {
      setBlink(false);
      t = setTimeout(() => setI(1), startDelay);
      return () => clearTimeout(t);
    }

    if (!deleting && i < current.length) {
      // typing forward
      setBlink(false);
      t = setTimeout(() => setI(i + 1), typeSpeed);
    } else if (!deleting && i === current.length) {
      // finished typing -> pause with blinking caret, then start deleting
      setBlink(true);
      t = setTimeout(() => {
        setBlink(false);
        setDeleting(true);
      }, finishDelay);
    } else if (deleting && i > 0) {
      // deleting backward
      setBlink(false);
      t = setTimeout(() => setI(i - 1), deleteSpeed);
    } else if (deleting && i === 0) {
      // done deleting -> move to next phrase (or same word if only one) and type again
      setDeleting(false);
      const next = (phrase + 1) % list.length;
      setPhrase(next);
      t = setTimeout(() => setI(1), typeSpeed);
    }

    return () => clearTimeout(t);
  }, [i, deleting, phrase, current, typeSpeed, deleteSpeed, startDelay, finishDelay, list.length]);

  return (
    <Tag className={className}>
      {visible}
      {showCaret && (
        <span className={`tw-caret ${blink ? "is-blinking" : ""}`} aria-hidden="true" />
      )}
    </Tag>
  );
}
